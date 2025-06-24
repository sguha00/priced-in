import { Agent, AgentInputItem, run, tool } from "@openai/agents";
import { existsSync } from "fs";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import invariant from "tiny-invariant";
import { z } from "zod";

invariant(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is not set");
const client = new OpenAI();

const log = (message: string) => {
  message = `[${new Date().toISOString()}] ${message}`;
  console.log(message);
  appendFile("agent.log", message + "\n");
};

const webSearch = async (query: string): Promise<string> => {
  const response = await client.responses.parse({
    model: "gpt-4.1",
    input: `Please use web search to answer this query from the user and respond with a short summary in markdown of what you found:\n\n${query}`,
    tools: [{ type: "web_search_preview" }],
  });
  return response.output_text;
};

const getStockPrice = async (ticker: string): Promise<number> => {
  const response = await client.responses.parse({
    model: "gpt-4.1",
    input: `What is the current price of the stock ticker $${ticker}? Please use web search to get the latest price and then answer in short.`,
    tools: [{ type: "web_search_preview" }],
    text: { format: zodTextFormat(z.object({ price: z.number() }), "price") },
  });
  if (!response.output_parsed) throw new Error("Failed to get stock price");
  return response.output_parsed.price;
};

const getPortfolio = async (): Promise<z.infer<typeof portfolioSchema>> => {
  const portfolioData = await readFile("portfolio.json", "utf-8");
  const portfolio = portfolioSchema.parse(JSON.parse(portfolioData));
  return portfolio;
};

const portfolioSchema = z.object({
  cash: z.number(),
  holdings: z.record(z.string(), z.number()),
  history: z.array(
    z.object({
      date: z.string().datetime(),
      type: z.enum(["buy", "sell"]),
      ticker: z.string(),
      shares: z.number(),
      price: z.number(),
      total: z.number(),
    })
  ),
});

const getPortfolioTool = tool({
  name: "get_portfolio",
  description: "Get your portfolio",
  parameters: z.object({}),
  async execute() {
    const portfolio = await getPortfolio();
    log(`💹 Fetched portfolio: $${portfolio.cash}`);
    return `Your cash balance is $${portfolio.cash}.
Current holdings:
${Object.entries(portfolio.holdings)
  .map(([ticker, shares]) => `  - ${ticker}: ${shares} shares`)
  .join("\n")}\n\nTrade history:
${portfolio.history
  .map(
    (trade) =>
      `  - ${trade.date} ${trade.type} ${trade.ticker} ${trade.shares} shares at $${trade.price} per share, for a total of $${trade.total}`
  )
  .join("\n")}`;
  },
});

const getNetWorthTool = tool({
  name: "get_net_worth",
  description: "Get your current net worth (total portfolio value)",
  parameters: z.object({}),
  async execute() {
    const netWorth = await calculateNetWorth();
    const portfolio = await getPortfolio();
    const returnPercentage = (((netWorth - 1000) / 1000) * 100).toFixed(2);

    log(`💰 Current net worth: $${netWorth} (${returnPercentage}% return)`);

    return `Your current net worth is $${netWorth}
- Cash: $${portfolio.cash}
- Holdings value: $${(netWorth - portfolio.cash).toFixed(2)}
- Total return: ${returnPercentage}% (started with $1,000)
- ${netWorth >= 1000 ? "📈 Up" : "📉 Down"} $${Math.abs(
      netWorth - 1000
    ).toFixed(2)} from initial investment`;
  },
});

const buyTool = tool({
  name: "buy",
  description: "Buy a given stock at the current market price",
  parameters: z.object({
    ticker: z.string(),
    shares: z.number().positive(),
  }),
  async execute({ ticker, shares }) {
    const price = await getStockPrice(ticker);
    const portfolio = await getPortfolio();
    if (portfolio.cash < shares * price)
      return `You don't have enough cash to buy ${shares} shares of ${ticker}. Your cash balance is $${portfolio.cash} and the price is $${price} per share.`;

    portfolio.holdings[ticker] = (portfolio.holdings[ticker] ?? 0) + shares;
    portfolio.history.push({
      date: new Date().toISOString(),
      type: "buy",
      ticker,
      shares,
      price,
      total: shares * price,
    });
    portfolio.cash = Math.round((portfolio.cash - shares * price) * 100) / 100;
    await writeFile("portfolio.json", JSON.stringify(portfolio, null, 2));

    log(`💰 Purchased ${shares} shares of ${ticker} at $${price} per share`);
    return `Purchased ${shares} shares of ${ticker} at $${price} per share, for a total of $${
      shares * price
    }. Your cash balance is now $${portfolio.cash}.`;
  },
});

const sellTool = tool({
  name: "sell",
  description: "Sell a given stock at the current market price",
  parameters: z.object({
    ticker: z.string(),
    shares: z.number().positive(),
  }),
  async execute({ ticker, shares }) {
    const portfolio = await getPortfolio();
    if (portfolio.holdings[ticker] < shares)
      return `You don't have enough shares of ${ticker} to sell. You have ${portfolio.holdings[ticker]} shares.`;

    const price = await getStockPrice(ticker);
    portfolio.holdings[ticker] = (portfolio.holdings[ticker] ?? 0) - shares;
    portfolio.history.push({
      date: new Date().toISOString(),
      type: "sell",
      ticker,
      shares,
      price,
      total: shares * price,
    });
    portfolio.cash = Math.round((portfolio.cash + shares * price) * 100) / 100;
    await writeFile("portfolio.json", JSON.stringify(portfolio, null, 2));

    log(`💸 Sold ${shares} shares of ${ticker} at $${price} per share`);
    return `Sold ${shares} shares of ${ticker} at $${price} per share, for a total of $${
      shares * price
    }. Your cash balance is now $${portfolio.cash}.`;
  },
});

const getStockPriceTool = tool({
  name: "get_stock_price",
  description: "Get the current price of a given stock ticker",
  parameters: z.object({
    ticker: z.string(),
  }),
  async execute({ ticker }) {
    const price = await getStockPrice(ticker);
    log(`🔖 Searched for stock price for ${ticker}: $${price}`);
    return price;
  },
});

const webSearchTool = tool({
  name: "web_search",
  description: "Search the web for information",
  parameters: z.object({
    query: z.string(),
  }),
  async execute({ query }) {
    log(`🔍 Searching the web for: ${query}`);
    const result = await webSearch(query);
    return result;
  },
});

const thinkTool = tool({
  name: "think",
  description: "Think about a given topic",
  parameters: z.object({
    thought_process: z.array(z.string()),
  }),
  async execute({ thought_process }) {
    thought_process.forEach((thought) => log(`🧠 ${thought}`));
    return `Completed thinking with ${thought_process.length} steps of reasoning.`;
  },
});

const calculateNetWorth = async (): Promise<number> => {
  const portfolio = await getPortfolio();
  let totalHoldingsValue = 0;
  for (const [ticker, shares] of Object.entries(portfolio.holdings))
    if (shares > 0) {
      try {
        const price = await getStockPrice(ticker);
        totalHoldingsValue += shares * price;
      } catch (error) {
        log(`⚠️ Failed to get price for ${ticker}: ${error}`);
      }
    }

  const netWorth =
    Math.round((portfolio.cash + totalHoldingsValue) * 100) / 100;
  return netWorth;
};

const calculatePortfolioValue = async (): Promise<{
  totalValue: number;
  holdings: Record<string, { shares: number; value: number }>;
}> => {
  const portfolio = await getPortfolio();
  const holdingsWithValues: Record<string, { shares: number; value: number }> =
    {};
  let totalHoldingsValue = 0;

  for (const [ticker, shares] of Object.entries(portfolio.holdings)) {
    if (shares > 0) {
      try {
        const price = await getStockPrice(ticker);
        const value = Math.round(shares * price * 100) / 100;
        holdingsWithValues[ticker] = { shares, value };
        totalHoldingsValue += value;
      } catch (error) {
        log(`⚠️ Failed to get price for ${ticker}: ${error}`);
        holdingsWithValues[ticker] = { shares, value: 0 };
      }
    }
  }

  const totalValue =
    Math.round((portfolio.cash + totalHoldingsValue) * 100) / 100;
  return { totalValue, holdings: holdingsWithValues };
};

const loadThread = async (): Promise<AgentInputItem[]> => {
  try {
    if (existsSync("thread.json")) {
      const threadData = await readFile("thread.json", "utf-8");
      return JSON.parse(threadData).slice(-100);
    }
  } catch (error) {
    log(`⚠️ Failed to load thread history: ${error}`);
  }
  return [];
};

const saveThread = async (thread: AgentInputItem[]) => {
  try {
    await writeFile("thread.json", JSON.stringify(thread, null, 2));
    log(`💾 Saved thread history (${thread.length} items)`);
  } catch (error) {
    log(`❌ Failed to save thread history: ${error}`);
  }
};

const updateReadme = async () => {
  try {
    const portfolio = await getPortfolio();
    const { totalValue, holdings } = await calculatePortfolioValue();
    const readmeContent = await readFile("README.md", "utf-8");
    const recentTrades = portfolio.history.slice(-5).reverse();
    const portfolioSection = `<!-- auto start -->

## 💰 Current Portfolio

**Total Value: $${totalValue.toFixed(2)}** (Started with $1,000)

### 📊 Current Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $${portfolio.cash.toFixed(2)} |
${Object.entries(holdings)
  .map(
    ([ticker, data]) =>
      `| ${ticker} | ${data.shares} | $${data.value.toFixed(2)} |`
  )
  .join("\n")}

### 📈 Recent Trades

${
  recentTrades.length > 0
    ? recentTrades
        .map(
          (trade) =>
            `- **${new Date(
              trade.date
            ).toLocaleDateString()}**: ${trade.type.toUpperCase()} ${
              trade.shares
            } ${trade.ticker} @ $${trade.price}/share ($${trade.total.toFixed(
              2
            )})`
        )
        .join("\n")
    : "- No trades yet"
}

### 🎯 Performance

- **Return**: ${(((totalValue - 1000) / 1000) * 100).toFixed(2)}%
- **Last Updated**: ${new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    })} UTC

<!-- auto end -->`;

    const updatedReadme = readmeContent.replace(
      /<!-- auto start -->[\s\S]*<!-- auto end -->/,
      portfolioSection
    );

    await writeFile("README.md", updatedReadme);
    log(`📝 Updated README with portfolio value: $${totalValue}`);
  } catch (error) {
    log(`❌ Failed to update README: ${error}`);
  }
};

const agent = new Agent({
  name: "Assistant",
  instructions: `You are an autonomous AI stock trading agent that executes trades every 6 hours with the goal of multiplying an initial investment of $1,000.

CRITICAL REQUIREMENT - MANDATORY THINKING PROCESS:
- You MUST use the "think" tool before calling ANY other tool
- The think tool should contain your step-by-step reasoning process
- After receiving results from any tool, use think again to process the results and plan next steps
- This ensures transparency in your decision-making process
- Format your thoughts as an array of logical steps

EXECUTION SCHEDULE:
- You run automatically four times a day
- Each run is an opportunity to analyze markets and make trading decisions
- You started with $1,000 in cash
- Your primary objective is to multiply this initial capital through strategic trading

AVAILABLE TOOLS:
1. think: Think step by step about what you want to do next (MUST BE USED BEFORE ANY OTHER TOOL)
2. get_portfolio: Check your current portfolio status including:
   - Net worth (total value of cash + holdings)
   - Cash balance available for trading
   - Current stock holdings
   - Complete trade history
3. get_net_worth: Quick check of your total portfolio value and return percentage
4. get_stock_price: Get the current price of a given stock ticker
5. buy: Purchase stocks using available cash balance
6. sell: Sell stocks from your holdings to generate cash
7. web_search: Research market conditions, stock prices, news, and analysis

TRADING STRATEGY:
- Start each run by thinking about your approach, then checking your portfolio
- Use web search to identify market opportunities and check current stock prices
- Look for stocks with strong momentum, positive news, or technical breakouts
- Consider both day trading opportunities and longer-term growth stocks
- Maintain a balance between aggressive growth and risk management
- Track your progress toward multiplying the initial $1,000

DECISION FRAMEWORK:
1. Initial Thinking: Use think tool to plan your approach
2. Portfolio Review: Check your current portfolio status (with thinking before and after)
3. Market Analysis: Search for market trends, top movers, and breaking news (with thinking)
4. Opportunity Identification: Find stocks with high potential returns (with reasoning)
5. Risk Assessment: Evaluate potential downside before any trade (think through risks)
6. Execution: Make calculated buy/sell decisions based on available capital
7. Performance Tracking: Monitor your net worth growth over time

RISK MANAGEMENT:
- Never put all capital into a single position
- Consider keeping some cash reserve for opportunities
- Sell underperforming positions to free up capital
- Focus on liquid stocks that can be easily traded
- Be willing to take profits when substantial gains are achieved

PERFORMANCE GOALS:
- Short-term: Achieve consistent hourly/daily gains
- Medium-term: Double the initial investment within reasonable timeframe
- Long-term: Multiply the initial $1,000 by 10x or more
- Track your performance: Current net worth vs. initial $1,000

Remember: You have full autonomy to make trading decisions. Focus on growing the initial $1,000 through smart, calculated trades while managing risk appropriately. ALWAYS think before you act!`,
  tools: [
    thinkTool,
    webSearchTool,
    buyTool,
    sellTool,
    getStockPriceTool,
    getPortfolioTool,
    getNetWorthTool,
  ],
});

log("Starting agent");

const thread = await loadThread();
const result = await run(
  agent,
  thread.concat({
    role: "user",
    content: `It's ${new Date().toLocaleString(
      "en-US"
    )}. Time for your trading analysis! Review your portfolio, scan the markets for opportunities, and make strategic trades to grow your initial $1,000 investment. Good luck! 📈`,
  }),
  { maxTurns: 100 }
);
log(`🎉 Agent finished: ${result.finalOutput}`);

await saveThread(result.history);
await updateReadme();

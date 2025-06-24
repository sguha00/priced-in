# 🤖 Priced In - Autonomous AI Trading Agent

An autonomous AI-powered stock trading agent that executes trades every hour with the goal of multiplying an initial investment of $1,000. Built with OpenAI's Agents framework and runs automatically via GitHub Actions.

<!-- auto start -->

## 💰 Current Portfolio

**Total Value: $1000.00** (Started with $1,000)

### 📊 Current Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $57.87 |
| PLTR | 1 | $139.92 |
| TSLA | 1 | $348.68 |
| NVDA | 2 | $288.34 |
| GOOGL | 1 | $165.19 |

### 📈 Recent Trades

- **6/24/2025**: BUY 1 GOOGL @ $165.19/share ($165.19)
- **6/24/2025**: BUY 2 NVDA @ $144.17/share ($288.34)
- **6/24/2025**: BUY 1 TSLA @ $348.68/share ($348.68)
- **6/24/2025**: BUY 1 PLTR @ $139.92/share ($139.92)

### 🎯 Performance

- **Return**: 0.00%
- **Last Updated**: 6/24/2025, 1:20:10 PM UTC

<!-- auto end -->

## 🚀 Features

- **Autonomous Trading**: Runs automatically every hour via GitHub Actions
- **AI-Powered Decisions**: Uses OpenAI GPT-4.1 for market analysis and trading decisions
- **Real-Time Market Data**: Fetches current stock prices and market information via web search
- **Portfolio Management**: Tracks cash balance, stock holdings, and complete trade history
- **Risk Management**: Built-in strategies to balance growth and risk
- **Transparent Decision Making**: Uses a "think" tool to document reasoning before each action
- **Automated Logging**: Maintains detailed logs of all activities and decisions

## 📋 Prerequisites

- Node.js 20 or higher
- OpenAI API key with access to GPT-4.1
- GitHub account (for automated execution)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/AnandChowdhary/priced-in.git
cd priced-in
```

2. Install dependencies:

```bash
npm install
```

3. Set up your OpenAI API key:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

## 🏃‍♂️ Running the Agent

### Local Execution

Run the trading agent manually:

```bash
npm start
```

This will execute one trading session where the agent will:

1. Check the current portfolio
2. Analyze market conditions
3. Make trading decisions
4. Update the portfolio

### Automated Execution (GitHub Actions)

The agent is configured to run automatically every hour via GitHub Actions. To enable this:

1. Fork this repository
2. Go to Settings → Secrets and variables → Actions
3. Add a new repository secret named `OPENAI_API_KEY` with your OpenAI API key
4. The agent will now run automatically every hour

You can also trigger a manual run from the Actions tab in your GitHub repository.

## 📊 Portfolio Structure

The agent's portfolio is stored in `portfolio.json`:

```json
{
  "cash": 95.44,
  "holdings": {
    "AAPL": 4,
    "CLNE": 56
  },
  "history": [
    {
      "date": "2025-06-21T12:43:07.141Z",
      "type": "buy",
      "ticker": "AAPL",
      "shares": 4,
      "price": 201.5,
      "total": 806
    }
  ]
}
```

- **cash**: Available cash balance for trading
- **holdings**: Current stock positions (ticker: number of shares)
- **history**: Complete record of all trades

## ⚠️ Disclaimer

This is an experimental AI trading agent for educational purposes. Real trading involves significant risk. Never invest money you cannot afford to lose.

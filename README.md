# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,187.46** (460.08% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $5.59 |
| NVDA | 2.8200000000000003 | $494.94 |
| GOOGL | 1 | $195.75 |
| RCL | 0.146 | $48.82 |
| HEI | 0.084 | $27.17 |
| XLI | 0.43 | $65.68 |
| HLIT | 7 | $61.04 |
| ENVB | 89 | $109.47 |
| IMNN | 25 | $179.00 |

### 📈 Recent trades

- **July 30, 2025 at 5:40:17 AM**: BUY 25 IMNN @ $7/share ($175.00)
- **July 30, 2025 at 5:40:09 AM**: BUY 89 ENVB @ $1.23/share ($109.47)
- **July 30, 2025 at 5:40:08 AM**: BUY 7 HLIT @ $8.72/share ($61.04)
- **July 30, 2025 at 5:39:51 AM**: SELL 2 NVDA @ $175.51/share ($351.02)
- **July 3, 2025 at 12:07:35 PM**: BUY 0.106 XLI @ $148.16/share ($15.70)
- **July 3, 2025 at 6:07:01 AM**: BUY 0.101 XLI @ $148.16/share ($14.96)
- **July 3, 2025 at 12:17:56 AM**: BUY 0.094 XLI @ $148.16/share ($13.93)
- **July 2, 2025 at 12:07:32 PM**: BUY 0.129 XLI @ $148.01/share ($19.09)
- **July 2, 2025 at 6:06:55 AM**: BUY 0.084 HEI @ $321.51/share ($27.01)
- **July 2, 2025 at 12:17:45 AM**: BUY 0.146 RCL @ $315.1/share ($46.00)

<!-- auto end -->

- [🧠 Logs](./agent.log)
- [🧑‍💻 System prompt](./system-prompt.md)
- [📁 Source code](./agent.ts)

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

## 🏃‍♂️ Running the agent

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

### Local execution

Run the trading agent manually:

```bash
npm start
```

This will execute one trading session where the agent will:

1. Check the current portfolio
2. Analyze market conditions
3. Make trading decisions
4. Update the portfolio

### Automated execution via GitHub Actions

The agent is configured to run automatically every hour via GitHub Actions. To enable this:

1. Fork this repository
2. Go to Settings → Secrets and variables → Actions
3. Add a new repository secret named `OPENAI_API_KEY` with your OpenAI API key
4. The agent will now run automatically every hour

You can also trigger a manual run from the Actions tab in your GitHub repository.

## ⚠️ Disclaimer

This is an experimental AI trading agent for educational purposes. Real trading involves significant risk. Never invest money you cannot afford to lose.

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)

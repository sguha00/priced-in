# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,087.98** (2,102.74% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.08 |
| NVDA | 4.82 | $768.02 |
| GOOGL | 1 | $179.53 |
| RCL | 0.146 | $48.83 |
| HEI | 0.084 | $27.27 |
| XLI | 0.43 | $64.25 |

### 📈 Recent trades

- **July 3, 2025 at 12:07:35 PM**: BUY 0.106 XLI @ $148.16/share ($15.70)
- **July 3, 2025 at 6:07:01 AM**: BUY 0.101 XLI @ $148.16/share ($14.96)
- **July 3, 2025 at 12:17:56 AM**: BUY 0.094 XLI @ $148.16/share ($13.93)
- **July 2, 2025 at 12:07:32 PM**: BUY 0.129 XLI @ $148.01/share ($19.09)
- **July 2, 2025 at 6:06:55 AM**: BUY 0.084 HEI @ $321.51/share ($27.01)
- **July 2, 2025 at 12:17:45 AM**: BUY 0.146 RCL @ $315.1/share ($46.00)
- **July 1, 2025 at 6:05:53 PM**: SELL 0.885 NVDA @ $154.45/share ($136.69)
- **June 30, 2025 at 6:06:24 PM**: BUY 0.441 NVDA @ $158.04/share ($69.70)
- **June 30, 2025 at 12:07:38 PM**: BUY 0.444 NVDA @ $157.75/share ($70.04)
- **June 29, 2025 at 6:05:40 PM**: SELL 40 NIO @ $3.46/share ($138.40)
- **June 28, 2025 at 6:05:57 AM**: BUY 0.82 NVDA @ $157.75/share ($129.35)
- **June 28, 2025 at 6:05:45 AM**: SELL 1 PLTR @ $130.74/share ($130.74)
- **June 27, 2025 at 12:08:51 PM**: BUY 0.38 NVDA @ $155.02/share ($58.91)
- **June 27, 2025 at 12:08:45 PM**: BUY 40 NIO @ $3.42/share ($136.80)
- **June 27, 2025 at 12:08:41 PM**: SELL 14 RIVN @ $13.91/share ($194.74)
- **June 26, 2025 at 6:05:56 PM**: BUY 0.12 NVDA @ $155.99/share ($18.72)
- **June 26, 2025 at 12:07:10 PM**: BUY 0.5 NVDA @ $154.31/share ($77.16)
- **June 25, 2025 at 6:06:14 PM**: BUY 2 NVDA @ $153.66/share ($307.32)
- **June 25, 2025 at 6:06:05 PM**: SELL 81 BB @ $4.965/share ($402.16)
- **June 25, 2025 at 12:08:38 PM**: BUY 81 BB @ $4.33/share ($350.73)

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

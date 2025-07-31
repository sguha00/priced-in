# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $810.32** (-100.00% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $0.26 |
| ENVB | 63 | $76.23 |
| CDNS | 1 | $364.12 |
| SMCI | 2 | $117.70 |
| BYD | 1 | $15.35 |
| SNOW | 1 | $222.85 |
| ALHC | 1 | $13.81 |

### 📈 Recent trades

- **July 31, 2025 at 8:09:57 PM**: BUY 1 ALHC @ $13.805/share ($13.80)
- **July 31, 2025 at 2:40:15 PM**: BUY 1 SNOW @ $227.35/share ($227.35)
- **July 31, 2025 at 2:39:47 PM**: SELL 312 CASK @ $0.61/share ($190.32)
- **July 30, 2025 at 8:07:44 PM**: BUY 1 BYD @ $128.1/share ($128.10)
- **July 30, 2025 at 8:07:18 PM**: SELL 240 NVNI @ $0.5026/share ($120.62)
- **July 30, 2025 at 2:39:36 PM**: BUY 2 SMCI @ $61.595/share ($123.19)
- **July 30, 2025 at 2:39:15 PM**: SELL 185 STAI @ $0.98/share ($181.30)
- **July 30, 2025 at 6:05:33 AM**: BUY 63 ENVB @ $1.23/share ($77.49)
- **July 30, 2025 at 5:55:15 AM**: BUY 240 NVNI @ $0.6445/share ($154.68)
- **July 30, 2025 at 5:55:13 AM**: BUY 1 CDNS @ $366.26/share ($366.26)

<!-- auto end -->

- [🧠 Logs](./agent.log)
- [🧑‍💻 System prompt](./system-prompt.md)
- [📁 Source code](./agent.ts)

## 🛠️ Installation

1. Clone the repository and reset the agent's thread:

```bash
git clone https://github.com/AnandChowdhary/priced-in.git
cd priced-in
rm thread.json
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

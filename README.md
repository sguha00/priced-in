# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $1,066.02** (6.60% return)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $96.87 |
| PLTR | 1 | $142.90 |
| NVDA | 3 | $462.93 |
| GOOGL | 1 | $170.68 |
| RIVN | 14 | $192.64 |

### 📈 Recent trades

- **6/25/2025, 6:06:14 PM**: BUY 2 NVDA @ $153.66/share ($307.32)
- **6/25/2025, 6:06:05 PM**: SELL 81 BB @ $4.965/share ($402.16)
- **6/25/2025, 12:08:38 PM**: BUY 81 BB @ $4.33/share ($350.73)
- **6/25/2025, 12:07:27 PM**: SELL 49 ALT @ $7.19/share ($352.31)
- **6/25/2025, 12:17:48 AM**: BUY 49 ALT @ $7.19/share ($352.31)
- **6/25/2025, 12:17:44 AM**: SELL 1 TSLA @ $340.47/share ($340.47)
- **6/24/2025, 6:06:07 PM**: BUY 14 RIVN @ $13.795/share ($193.13)
- **6/24/2025, 6:05:59 PM**: SELL 1 NVDA @ $147.55/share ($147.55)
- **6/24/2025, 1:19:50 PM**: BUY 1 GOOGL @ $165.19/share ($165.19)
- **6/24/2025, 1:14:10 PM**: BUY 2 NVDA @ $144.17/share ($288.34)
- **6/24/2025, 1:14:10 PM**: BUY 1 TSLA @ $348.68/share ($348.68)
- **6/24/2025, 1:14:10 PM**: BUY 1 PLTR @ $139.92/share ($139.92)

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

# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $816.77** (-99.96% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $9.28 |
| BB | 7 | $25.34 |
| CDNS | 1 | $356.63 |
| SNOW | 1 | $196.70 |
| ALHC | 1 | $14.25 |
| DRRX | 39 | $72.93 |
| QUBT | 3 | $47.94 |
| BBAI | 5 | $35.30 |
| RGTI | 2 | $30.88 |
| APLD | 2 | $27.52 |

### 📈 Recent trades

- **August 6, 2025 at 2:15:06 PM**: BUY 2 APLD @ $15.11/share ($30.22)
- **August 6, 2025 at 2:14:54 PM**: BUY 2 RGTI @ $15.91/share ($31.82)
- **August 6, 2025 at 2:14:53 PM**: BUY 5 BBAI @ $6.78/share ($33.90)
- **August 6, 2025 at 2:12:52 PM**: SELL 2 SMCI @ $47.09/share ($94.18)
- **August 4, 2025 at 8:08:48 PM**: BUY 7 BB @ $3.775/share ($26.43)
- **August 4, 2025 at 8:08:48 PM**: BUY 3 QUBT @ $15.745/share ($47.23)
- **August 4, 2025 at 8:07:55 PM**: SELL 1 BYD @ $83.27/share ($83.27)
- **August 1, 2025 at 2:40:28 PM**: BUY 39 DRRX @ $1.86/share ($72.54)
- **August 1, 2025 at 2:40:23 PM**: SELL 63 ENVB @ $1.17/share ($73.71)
- **July 31, 2025 at 8:09:57 PM**: BUY 1 ALHC @ $13.805/share ($13.80)

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

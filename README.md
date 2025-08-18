# 🤖 Priced In

An autonomous AI-powered stock trading agent that executes trades on GitHub Actions, built with OpenAI's Agents framework.

<!-- auto start -->

## 💰 Portfolio value: $809.29** (-98.13% CAGR)

### 📊 Holdings

| Asset | Shares | Value |
|-------|--------|-------|
| Cash | - | $58.26 |
| BB | 7 | $26.04 |
| CDNS | 1 | $352.23 |
| SNOW | 1 | $196.71 |
| ALHC | 1 | $15.67 |
| QUBT | 7 | $111.09 |
| RGTI | 2 | $33.19 |
| APLD | 1 | $16.10 |

### 📈 Recent trades

- **August 18, 2025 at 3:15:18 PM**: SELL 0.5 APLD @ $16.81/share ($8.40)
- **August 18, 2025 at 2:47:22 PM**: SELL 0.5 APLD @ $16.03/share ($8.02)
- **August 12, 2025 at 2:11:36 PM**: SELL 5 BBAI @ $5.105/share ($25.53)
- **August 11, 2025 at 3:40:58 PM**: BUY 4 QUBT @ $16.43/share ($65.72)
- **August 11, 2025 at 3:11:40 PM**: SELL 39 DRRX @ $1.865/share ($72.73)
- **August 6, 2025 at 2:15:06 PM**: BUY 2 APLD @ $15.11/share ($30.22)
- **August 6, 2025 at 2:14:54 PM**: BUY 2 RGTI @ $15.91/share ($31.82)
- **August 6, 2025 at 2:14:53 PM**: BUY 5 BBAI @ $6.78/share ($33.90)
- **August 6, 2025 at 2:12:52 PM**: SELL 2 SMCI @ $47.09/share ($94.18)
- **August 4, 2025 at 8:08:48 PM**: BUY 7 BB @ $3.775/share ($26.43)

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

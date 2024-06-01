import yfinance as yf
from datetime import datetime, timedelta

# Define the assets and their target allocations
assets = {
    'SPY': 0.05,  # US Large Cap Value
    'MTUM': 0.10,  # US Momentum
    'IWN': 0.05,  # US Small Cap Value
    'EFA': 0.10,  # International Equities
    'EEM': 0.10,  # Emerging Market Equities
    'IEF': 0.05,  # Int-Term US Treasuries
    'BWX': 0.05,  # International Treasuries
    'LQD': 0.05,  # US Corporate Bonds
    'TLT': 0.05,  # Long-Term US Treasuries
    'DBC': 0.10,  # Commodities
    'GLD': 0.10,  # Gold
    'VNQ': 0.20   # US Real Estate
}

end_date = datetime.now()
start_date = end_date - timedelta(days=365)

# Function to check if an asset is above its 10-month moving average
def is_above_ma(ticker):
    data = yf.download(ticker, start=start_date, end=end_date)
    monthly_prices = data['Adj Close'].resample('M').last()
    ma = monthly_prices.rolling(window=10).mean()
    return monthly_prices.iloc[-1] > ma.iloc[-1]

# Create the initial portfolio
portfolio = {}

# Adjust the portfolio based on the strategy
for asset, allocation in assets.items():
    if is_above_ma(asset):
        portfolio[asset] = allocation
    else:
        portfolio[asset] = 0.0

# Calculate the cash position
total_invested = sum(portfolio.values())
portfolio['Cash'] = max(0.0, 1.0 - total_invested)

print("Portfolio allocation based on GTAA 13 strategy:")
for asset, allocation in portfolio.items():
    print(f"{asset}: {allocation:.2%}")


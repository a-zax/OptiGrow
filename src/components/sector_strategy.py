import yfinance as yf
from datetime import datetime, timedelta
import pandas as pd

# Get today's date
end_date = datetime.now()

# Sector ETFs
sectors = ['XHB', 'XLB', 'XLE', 'XLY', 'XLK', 'XLV', 'XLI', 'XLU', 'XLP', 'XLF', 'XLC', 'XLRE']

# Calculate returns for different periods and average them
def calculate_average_returns(ticker, end_date):
    returns = []
    for months in [1, 3, 6, 9, 12]:
        start_date = end_date - timedelta(days=30*months)
        historical_data = yf.download(ticker, start=start_date, end=end_date)
        price_start = historical_data['Adj Close'][0]
        price_end = historical_data['Adj Close'][-1]
        period_return = (price_end - price_start) / price_start
        returns.append(period_return)
    return sum(returns) / len(returns)

# Get historical data for SPY to calculate the 10-month moving average
spy_data = yf.download('SPY', start=end_date - timedelta(days=365), end=end_date)
spy_monthly = spy_data['Adj Close'].resample('M').mean()
spy_ma = spy_monthly.rolling(window=10).mean().iloc[-1]

# Determine if SPY is above the 10-month moving average
is_spy_above_ma = spy_data['Adj Close'][-1] > spy_ma

# Calculate average returns for each sector
sector_returns = {sector: calculate_average_returns(sector, end_date) for sector in sectors}

# Rank the sectors based on their average returns
ranked_sectors = sorted(sector_returns, key=sector_returns.get, reverse=True)

# Portfolio allocation logic
portfolio = {}
if is_spy_above_ma:
    # Go long the top 3 sectors
    top_sectors = ranked_sectors[:3]
    for sector in top_sectors:
        portfolio[sector] = 1/3  # equally weight the portfolio
else:
    # Move to cash
    portfolio['Cash'] = 1

print("Portfolio allocation:")
print(portfolio)


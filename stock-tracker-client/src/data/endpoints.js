import urls from "./urls";

const proxyUrl = process.env.NODE_ENV === 'production' ? urls.LOGIC_PROD_URL : urls.LOGIC_LOCAL_URL;

const endpoints = {
    profile: (uuid) => `${proxyUrl}/api/profile/id=${uuid}`,
    portfolio: (uuid) => `${proxyUrl}/api/portfolio/id=${uuid}`,
    portfolioTimeSeries: (uuid) => `${proxyUrl}/api/portfolio/timeSeries/id=${uuid}`,
    intradayStockData: (stockSymbol, interval) => `${proxyUrl}/api/stocks/intraday/stock=${stockSymbol}/interval=${interval}`,
    dailyStockData: (stockSymbol, compact) => `${proxyUrl}/api/stocks/daily/stock=${stockSymbol}/compact=${compact}`,
    stockSearch: (searchString) => `${proxyUrl}/api/stocks/search/searchString=${searchString}`
};

export default endpoints;
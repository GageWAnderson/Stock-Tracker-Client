import urls from "./urls";

const proxyUrl = process.env.NODE_ENV === 'production' ? urls.LOGIC_PROD_URL : urls.LOGIC_LOCAL_URL;

const endpoints = {
    getUserProfile: (uuid) => `${proxyUrl}/api/getUserProfile/uuid=${uuid}`,
    postOrPutUserProfile: (uuid, firstName, lastName, email) => `${proxyUrl}/api/postUserProfile/uuid=${uuid}/firstName=${firstName}/lastName=${lastName}/email=${email}`,
    deleteUserProfile: (uuid) => `${proxyUrl}/api/deleteUserProfile/uuid=${uuid}`,
    getPortfolio: (uuid) => `${proxyUrl}/api/getPortfolio/uuid=${uuid}`,
    postOrPutPortfolio: (uuid, stock, numShares) => `${proxyUrl}/api/postPortfolio/uuid=${uuid}/stock=${stock}/numShares=${numShares}`,
    deletePortfolio: (uuid) => `${proxyUrl}/api/deletePortfolio/uuid=${uuid}`,
    getIntradayStockData: (stockSymbol, interval) => `${proxyUrl}/api/stocks/intraday/${stockSymbol}/${interval}`,
    getDailyStockData: (stockSymbol, compact) => `${proxyUrl}/api/stocks/daily/${stockSymbol}/${compact}`,
    getStockSymbolSearchResults: (searchString) => `${proxyUrl}/api/stocks/search/searchString=${searchString}`
};

export default endpoints;
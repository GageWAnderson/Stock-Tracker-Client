import endpoints from "../data/endpoints";

const generateRequest = (method, data = null) => {
    if (data) {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    } else {
        return {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

}

const processResponse = (response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response type must be JSON.");
    } else if (!response.ok) {
        throw new Error(`Error with getting object, error code = ${response.status}`);
    } else {
        return response.json();
    }
}

const processRequest = async (url, data = null) => {
    if (data === null) {
        return fetch(url)
            .then((response) => {
                return processResponse(response);
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw new Error(`Error with getting object, error = ${error}`);
            });
    } else {
        return fetch(url, data)
            .then((response) => {
                return processResponse(response);
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw new Error(`Error with getting object, error = ${error}`);
            });
    }
}

export const getStockSymbolSearchResultsRequest = async (searchString) => {
    return processRequest(endpoints.stockSearch(searchString));
}

export const getIntradayStockDataRequest = async (stockSymbol, interval) => {
    return processRequest(endpoints.intradayStockData(stockSymbol, interval))
}

export const getDailyStockDataRequest = async (stockSymbol, compact) => {
    return processRequest(endpoints.dailyStockData(stockSymbol, compact));
}

export const readPortfolio = async (uuid) => {
    return processRequest(endpoints.portfolio(uuid));
}

export const postPortfolio = async (uuid, stock, numShares) => {
    const request = generateRequest('POST', { stockSymbol: stock, shareNumber: numShares });
    return processRequest(endpoints.portfolio(uuid), request);
}
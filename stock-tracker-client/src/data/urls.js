const apiKey = 'XVYXZBCQOHQB5GJE'; // Move to backend when you have the chance

const urls = {
    LOGIC_LOCAL_URL: "", // Proxy in package.json handles local routing
    LOGIC_PROD_URL: 'http://stocktrackertest-env.eba-bjucmvk2.us-east-1.elasticbeanstalk.com',
    STOCK_API_URL: (queryType, stockSymbol) => `https://www.alphavantage.co/query?function=${queryType}&symbol=${stockSymbol}&apikey=${apiKey}`
};

export default urls;
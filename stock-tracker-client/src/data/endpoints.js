import urls from "./urls";

const proxyUrl = process.env.NODE_ENV === 'production' ? urls.LOGIC_PROD_URL : urls.LOGIC_LOCAL_URL;

const endpoints = {
    getTestObject: (testId) => `${proxyUrl}/api/testObjects/${testId}`,
    getTestObjects: `${proxyUrl}/api/testObjects`,
    updateTestObject: (testId) => `${proxyUrl}/api/testObjects/${testId}`,
    saveTestObject: `${proxyUrl}/api/testObjects`,
    deleteTestObject: (testId) => `${proxyUrl}/api/testObjects/${testId}`
};

export default endpoints;
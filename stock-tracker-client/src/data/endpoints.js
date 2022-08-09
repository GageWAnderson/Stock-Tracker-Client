const endpoints = {
    getTestObject: (testId) => `/api/testObjects/${testId}`,
    getTestObjects: "/api/testObjects",
    updateTestObject: (testId) => `/api/testObjects/${testId}`,
    saveTestObject: "/api/testObjects",
    deleteTestObject: (testId) => `/api/testObjects/${testId}`
};

export default endpoints;
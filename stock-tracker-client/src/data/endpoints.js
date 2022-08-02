const endpoints = {
    getTestObject: (testId) => `/testObjects/${testId}`,
    getTestObjects: "/testObjects",
    updateTestObject: (testId) => `/testObjects/${testId}`,
    saveTestObject: "/testObjects",
    deleteTestObject: (testId) => `testObjects/${testId}`
};

export default endpoints;
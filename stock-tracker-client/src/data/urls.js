import ports from "./ports";

const urls = {
    LOGIC_LOCAL_URL: `http://localhost:${ports.LOGIC_LOCAL_PORT}`,
    LOGIC_PROD_URL: `http://stocktrackertest-env.eba-bjucmvk2.us-east-1.elasticbeanstalk.com:${ports.LOGIC_PROD_PORT}`
};

export default urls;
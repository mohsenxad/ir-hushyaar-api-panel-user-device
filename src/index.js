const userDeviceServices = require('./use-cases')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL,
    {
        MONGODB_URI: process.env.MONGODB_URI,
        DATABASE_NAME: process.env.DATABASE_NAME
    }
);

module.exports = userDeviceServices;

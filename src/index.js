const userDeviceServices = require('./use-cases')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL
);

module.exports = userDeviceServices;

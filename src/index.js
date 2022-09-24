const userDeviceServices = require('./use-cases')(
    MONGODB_DATAAPI_APPID,
    MONGODB_DATAAPI_APIKEY,
    PROXY_URL
);

module.exports = userDeviceServices;

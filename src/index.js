const userDeviceServices = require('./use-cases')(
    {
        MONGODB_URI: process.env.MONGODB_URI,
        DATABASE_NAME: process.env.DATABASE_NAME
    }
);

module.exports = userDeviceServices;

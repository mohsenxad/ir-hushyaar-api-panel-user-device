const mongoDBDriver = require('mongodb');
var MongoClient = mongoDBDriver.MongoClient;

module.exports  = function
(
    {
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {

        if
        (
            !MONGODB_URI
        )
            {
                throw new Error("MongoDB Client must have an MONGODB_URI");
            }

        if
        (
            !DATABASE_NAME
        )
            {
                throw new Error("MongoDB Client must have an DATABASE_NAME");
            }


        const {  getDb } = require('./get-db')
            (
                {
                    DATABASE_NAME: DATABASE_NAME,
                    MongoClient: MongoClient,
                    MONGODB_URI:MONGODB_URI
                }
            );

        const { getAllUserdeviceByUser } = require('./userDevice/getAll-userdevice-by-user')
        (
            mongoDBDriver,
            getDb
        );

        
        const { getAllUserdeviceByDevice } = require('./userDevice/getAll-userdevice-by-device')
        (
            mongoDBDriver,
            getDb
        );

        
        const { getUserdeviceByDeviceAndUser } = require('./userDevice/get-userdevice-by-device-and-user')
        (
            mongoDBDriver,
            getDb
        );

        
        const { addUser } = require('./user/add-user')
        (
            getDb
        );
        
        
        
        const services = Object.freeze(
            {
                getAllUserdeviceByUser,
                getAllUserdeviceByDevice,
                getUserdeviceByDeviceAndUser,
                addUser
            }
        );

        return services;

        
    }
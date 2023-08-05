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

        const {  getDb } = require('./get-db')
            (
                {
                    DATABASE_NAME: DATABASE_NAME,
                    MongoClient: MongoClient,
                    MONGODB_URI:MONGODB_URI
                }
            );

       
        const userDeviceServices = require('./userDevice')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        );

        const userServices = require('./user')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        )

        const deviceServices = require('./device')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        )
        
        
        
        const services = Object.freeze(
            {
                userDevice: userDeviceServices,
                device: deviceServices,
                user: userServices
            }
        );

        return services;

        
    }
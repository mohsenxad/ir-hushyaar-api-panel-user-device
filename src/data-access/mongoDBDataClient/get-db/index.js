const buildGetDb = require('./src/get-db');

module.exports = function(
    {
        MongoClient,
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {
        const getDb = buildGetDb(
            {
                DATABASE_NAME: DATABASE_NAME,
                MongoClient: MongoClient,
                MONGODB_URI: MONGODB_URI
            }
        );

        return Object.freeze(
            {
                getDb
            }
        )
    }
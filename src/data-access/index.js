module.exports =  function
(
    {
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {

        const dataClient = require('./mongoDBDataClient')
            (
                {
                    DATABASE_NAME:DATABASE_NAME,
                    MONGODB_URI: MONGODB_URI,
                }
            )

        return Object.freeze(
            {
                dataClient
            }
        );
    }
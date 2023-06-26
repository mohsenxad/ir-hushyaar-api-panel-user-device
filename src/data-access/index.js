module.exports =  function(
    APPID,
    APIKEY,
    proxyUrl,
    {
        MONGODB_URI,
        DATABASE_NAME
    }
){
    const dataApi = require('./mongoDBDataAPI')
    (
        APPID,
        APIKEY,
        proxyUrl
    );

    const dataClient = require('./mongoDBDataClient')
        (
            {
                DATABASE_NAME:DATABASE_NAME,
                MONGODB_URI: MONGODB_URI,
            }
        )

    return Object.freeze(
        {
            dataApi,
            dataClient
        }
    );
}
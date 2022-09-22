module.exports =  function(
    APPID,
    APIKEY,
    proxyUrl
){
    const dataApi = require('./mongoDBDataAPI')(APPID, APIKEY, proxyUrl)

    return Object.freeze(
        {
            dataApi,
        }
    );
}
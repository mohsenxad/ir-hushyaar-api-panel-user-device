const HttpsProxyAgent = require('https-proxy-agent');
module.exports =  function buildCreateAddUserDeviceRequest(apikey ,proxyUrl){
    return function createAddUserDeviceRequest(userDevice){
        const proxyAgent = new HttpsProxyAgent(proxyUrl);

        var options= {
            method:"POST",
            headers:
                {
                    "api-key": apikey,
                    "content-type":"application/json"
                },
            body: JSON.stringify(
                {
                    collection:"userdevices",
                    database:"homeSecurity",
                    dataSource:"Cluster0",
                    document: userDevice.toJson()
                }
            ),
            agent: proxyAgent
        };

        return options;
    }
}
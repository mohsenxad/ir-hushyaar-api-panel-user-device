module.exports =  function buildCreateAddUserDeviceRequest(apikey ,proxyAgent){
    return function createAddUserDeviceRequest(userDevice){
        
        const headers = {
            "api-key": apikey,
            "content-type":"application/json"
        };

        const body = JSON.stringify(
            {
                collection:"userdevices",
                database:"homeSecurity",
                dataSource:"Cluster0",
                document: userDevice.toBson()
            }
        )

        var options= {
            method:"POST",
            headers: headers,
            body: body
        };


        if(proxyAgent){
            options.agent = proxyAgent;
        }

        return options;
    }
}
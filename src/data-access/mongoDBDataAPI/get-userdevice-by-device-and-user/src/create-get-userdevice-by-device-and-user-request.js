module.exports =  function buildCreateGetAllUserDeviceByDeviceAndUserRequest(apikey ,proxyAgent){
    return function createGetAllUserDeviceByDeviceAndUserRequest(
        deviceId,
        userId
    ){
        const query = {
            "device": 
                { 
                    "$oid": deviceId
                }, 
            "user": 
                { 
                    "$oid": userId
                }
        };
        
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
                    filter: query,
                    
                }
            )
        };

        if(proxyAgent){
            options.agent = proxyAgent;
        }


        return options;
    }
}
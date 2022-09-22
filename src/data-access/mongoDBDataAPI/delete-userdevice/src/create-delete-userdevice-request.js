module.exports =  function buildCreateDeleteUserDeviceRequest(apikey ,proxyAgent){
    return function createDeleteUserDeviceRequest(
        userDeviceId
    ){
        const query = {
            "_id": 
                { 
                    "$oid": userDeviceId
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
                    filter: query
                }
            )
        };

        if(proxyAgent){
            options.agent = proxyAgent;
        }


        return options;
    }
}
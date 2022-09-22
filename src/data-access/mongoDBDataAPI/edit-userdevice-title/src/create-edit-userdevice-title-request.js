module.exports =  function buildCreateEditUserDeviceTitleRequest(apikey ,proxyAgent){
    return function createEditUserDeviceTitleRequest(
        userDeviceId,
        title
    ){

        const query = {
            "_id": 
                { 
                    "$oid": userDeviceId
                } 
        };

        const update = {
            "$set": {
                title: title
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
                    update: update
                }
            )
        };

        if(proxyAgent){
            options.agent = proxyAgent;
        }


        return options;
    }
}
module.exports =  function buildCreateEditUserDevicePermissionRequest(apikey ,proxyAgent){
    return function createEditUserDevicePermissionRequest(
        userDeviceId,
        isAdmin,
        isMonitor,
        isArchiver
    ){
        const query = {
            "_id": 
                { 
                    "$oid": userDeviceId
                } 
        };

        const update = {
            "$set": {
                isAdmin: isAdmin,
                isMonitor: isMonitor,
                isArchiver: isArchiver
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
module.exports =  function buildCreateGetAllUserDeviceByDeviceRequest(apikey ,proxyAgent){
    return function createGetAllUserDeviceByDeviceRequest(
        deviceId
    ){

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
                    pipeline: [
                        {
                            "$match": {
                                "device": 
                                    { 
                                        "$oid": deviceId
                                    } 
                            },
                        },
                        {
                            "$lookup" :{
                                from: "users",
                                localField : "user",
                                foreignField: "_id",
                                as: "userInfo"
                            }
                        },
                        {
                            $set: {
                                userInfo: {
                                    $arrayElemAt: ["$userInfo.title", 0] 
                                }
                            }
                        }
                    ]
                    
                }
            )
        };

        if(proxyAgent){
            options.agent = proxyAgent;
        }


        return options;
    }
}
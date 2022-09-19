module.exports =  function buildCreateGetAllUserDeviceByUserRequest(apikey ,proxyAgent){
    return function createGetAllUserDeviceByUserRequest(
        userId
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
                                "user": 
                                    { 
                                        "$oid": userId
                                    } 
                            },
                        },
                        {
                            "$lookup" :{
                                from: "devices",
                                localField : "device",
                                foreignField: "_id",
                                as: "deviceInfo"
                            }
                        },
                        {
                            $set: {
                                deviceInfo: {
                                    $arrayElemAt: ["$deviceInfo.title", 0] 
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
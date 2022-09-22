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
                            "$lookup" : {
                                from: "devices",
                                localField : "device",
                                foreignField: "_id",
                                as: "deviceInfo"
                            }
                        },
                        {
                            "$lookup" : {
                                from: "users",
                                localField : "user",
                                foreignField: "_id",
                                as: "userInfo"
                            }
                        },
                        {
                            $set: {
                                deviceInfo: {
                                    $arrayElemAt: ["$deviceInfo", 0] 
                                },
                                token: {
                                    $arrayElemAt: ["$deviceInfo.token", 0] 
                                },
                                title: {
                                    $arrayElemAt: ["$deviceInfo.title", 0] 
                                },
                                status: {
                                    $arrayElemAt: ["$deviceInfo.status", 0] 
                                }
                            }
                        },
                        {
                            $set: {
                                userInfo: {
                                    $arrayElemAt: ["$userInfo", 0] 
                                },
                                remaningDays: {
                                    $arrayElemAt: ["$userInfo.remaningDays", 0] 
                                }

                            }
                        },
                        {
                            $unwind: '$userInfo'
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
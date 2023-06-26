module.exports =  function buildCreateGetAllUserDeviceByDeviceAndUserRequest(apikey ,proxyAgent){
    return function createGetAllUserDeviceByDeviceAndUserRequest(
        deviceId,
        userId
    ){
        const pipeline = [
            {
                "$match": {
                    '$and': [
                        {
                            "user": 
                                { 
                                    "$oid": userId
                                }
                        },
                        {
                            "device": 
                                { 
                                    "$oid": deviceId
                                } 
                        }
                    ]
                }
                
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
                "$unwind": '$deviceInfo'
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
                "$unwind": '$userInfo'
            },
            {
                $set: {
                    token: "$deviceInfo.token",
                    title: "$deviceInfo.title",
                    status: "$deviceInfo.status"
                }
            },
            {
                $set: {
                    remaningDays: "$userInfo.remaningDays"
                }
            },
            { 
                $project: {
                    registerDate: 0,
                    deviceInfo: 0,
                    userInfo: 0
                }
            }
            
                
        ];




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
                    pipeline: pipeline
                    
                }
            )
        };


        if(proxyAgent){
            options.agent = proxyAgent;
        }


        return options;
    }
}
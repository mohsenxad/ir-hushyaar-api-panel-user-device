module.exports =  function buildCreateGetAllUserDeviceByUserRequest(apikey ,proxyAgent){
    return function createGetAllUserDeviceByUserRequest(
        userId
    ){

        const pipeline = [
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
                $unwind: '$deviceInfo'
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
                $unwind: '$userInfo'
            },
            {
                $set: {
                    _id: "$deviceInfo._id",
                    token: "$deviceInfo.token",
                    title: "$deviceInfo.title",
                    status: "$deviceInfo.status"
                }
            },
            {
                $set: {
                    remaningDays: "$userInfo.remaningDays"
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
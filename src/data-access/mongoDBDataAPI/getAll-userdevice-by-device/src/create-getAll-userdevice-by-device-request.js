module.exports =  function buildCreateGetAllUserDeviceByDeviceRequest
(
    apikey,
    proxyAgent
)
    {
        return function createGetAllUserDeviceByDeviceRequest(
            deviceId
        ){

            const pipeline = [
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
                    "$unwind": '$userInfo'
                },
                {
                    $set: {
                        title: "$userInfo.title",
                        mobileNumber: "$userInfo.mobileNumber"
                    }
                },
                { 
                    $project: {
                        userInfo: 0,
                        registerDate: 0,
                        user:0,
                        device:0
                    }
                }
            ]

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
module.exports = function buildCreateGetAllUserdeviceByDeviceOptions
(
    mongoDBDriver
)
    {
        if
        (
            !mongoDBDriver
        )
            {
                throw new Error("buildCreateGetAllUserdeviceByDeviceOptions must have an mongoDBDriver");
            }
        
        return function createGetAllUserdeviceByDeviceOptions
        (
            deviceId
        )
            {
                const deviceObjectId = mongoDBDriver.ObjectID(
                    deviceId
                );

                const pipeline = [
                    {
                        "$match": {
                            "device": deviceObjectId
                        },
                    },
                    
                    {
                        $unset: [
                            'registerDate',
                        ]
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
                        $unwind: '$userInfo'
                    },
                    {
                        $unset: [
                            'user',
                            'device',
                            'userInfo',
                        ]
                    }
                ];


                const options = {
                    pipeline: pipeline
                }
                
                return options;
            }
    }
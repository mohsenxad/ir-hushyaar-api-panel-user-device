module.exports = function buildCreateGetUserdeviceByDeviceAndUserOptions
(
    {
        mongoDBDriver
    }
)
    {
        if
        (
            !mongoDBDriver
        )
            {
                throw new Error("buildCreateGetUserdeviceByDeviceAndUserOptions must have an mongoDBDriver");
            }

        return function createGetUserdeviceByDeviceAndUserOptions
        (
            {
                deviceId,
                userId
            }
        )
            {
                if
                (
                    !deviceId
                )
                    {
                        throw new Error("createGetUserdeviceByDeviceAndUserOptions must have an deviceId");
                    }

                if
                (
                    !userId
                )
                    {
                        throw new Error("createGetUserdeviceByDeviceAndUserOptions must have an userId");
                    }
                    
                const deviceObjectId = mongoDBDriver.ObjectID(
                    deviceId
                );

                const userObjectId = mongoDBDriver.ObjectID(
                    userId
                );

                const pipeline = [
                    {
                        "$match": {
                            "device": deviceObjectId,
                            "user":userObjectId
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
                        $set: {
                            remaningDays: "$userInfo.remaningDays",
                            title: "$deviceInfo.title",
                            status: "$deviceInfo.status",
                            token: "$deviceInfo.token"
                        }
                    },
                    {
                        $unset: [
                            'registerDate',
                            'deviceInfo',
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
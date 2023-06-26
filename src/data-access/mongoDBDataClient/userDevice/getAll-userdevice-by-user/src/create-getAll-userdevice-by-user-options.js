module.exports = function buildCreateGetAllUserdeviceByUserOptions
(
    mongoDBDriver
)
    {
        return function createGetAllUserdeviceByUserOptions
        (
            userId
        )
            {
                const userObjectId = mongoDBDriver.ObjectID(
                    userId
                );


                const pipeline = [
                    
                    {
                        "$match": {
                            "user":userObjectId
                        },
                    },
                    {
                        $unset: [
                            'registerDate',
                        ]
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
                            localField : "deviceInfo.user",
                            foreignField: "_id",
                            as: "userInfo"
                        }
                    },
                    {
                        $unwind: '$userInfo'
                    },
                    {
                        $unset: [
                            'userInfo.wpSubList',
                            'userInfo.isValid',
                            'userInfo.isMobileNumberConfirmed',
                            'userInfo.lastWPDateTime',
                            'userInfo.lastSMSDateTime',
                            'userInfo.registerDate',
                            'userInfo.password',
                            'userInfo.mobileNumber',
                            'userInfo.email',
                            'userInfo.storageMaxSize',
                            'userInfo.storageRemainedSize',
                            'userInfo.storageUsedSize',
                            
                        ]
                    },
                    {
                        $set: {
                            _id: "$deviceInfo._id",
                            token: "$deviceInfo.token",
                            //title: "$deviceInfo.title",
                            status: "$deviceInfo.status"
                        }
                    },
                    { 
                        $set: {
                            remaningDays: "$userInfo.remaningDays"
                        }
                    },
                    {
                        $unset: [
                            'deviceInfo.registerDate',
                            'deviceInfo.sensorList',
                            'deviceInfo.actuatorList',
                            'deviceInfo.manufactureId',
                            'deviceInfo.type',
                        ]
                    },
                ];


                const options = {
                    pipeline: pipeline
                }
                
                return options;
            }
    }
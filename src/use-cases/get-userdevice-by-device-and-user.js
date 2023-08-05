module.exports = function buildGetUserdeviceByDeviceAndUser
(
    {
        getUserdeviceByDeviceAndUserDB
    }
)
    {

        if
        (
            !getUserdeviceByDeviceAndUserDB
        )
            {
                throw new Error("buildGetUserdeviceByDeviceAndUser must have an getUserdeviceByDeviceAndUserDB");
            }

        return async function getUserdeviceByDeviceAndUser
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
                        throw new Error("getUserdeviceByDeviceAndUser must have an deviceId");
                    }

                if
                (
                    !userId
                )
                    {
                        throw new Error("getUserdeviceByDeviceAndUser must have an userId");
                    }

                const response = await getUserdeviceByDeviceAndUserDB(
                    {
                        deviceId: deviceId,
                        userId: userId
                    }
                );
                
                return response;        
            }
    }
module.exports = function buildGetUserdeviceByDeviceAndUser
(
    getUserdeviceByDeviceAndUserDataAccess
)
    {

        return async function getUserdeviceByDeviceAndUser
        (
            deviceId,
            userId
        )
            {

                const response = await getUserdeviceByDeviceAndUserDataAccess(
                    deviceId,
                    userId
                );
                
                return response;        
            }
    }
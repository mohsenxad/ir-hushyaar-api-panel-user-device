module.exports = function buildGetAllUserDeviceByUser
(
    dataAccess
)
    {
        return async function getAllUserDeviceByUser
        (
            userId
        )
            {
                const response = await dataAccess.dataClient.getAllUserdeviceByUser(
                    userId
                );
                
                return response;        
            }
    }
module.exports = function buildGetAllUserDeviceByDevice
(
    dataAccess
)
    {

        return async function getAllUserDeviceByDevice
        (
            deviceId
        )
            {
                const userDeviceList = await dataAccess.dataClient.getAllUserdeviceByDevice(
                    deviceId
                );
                
                return userDeviceList;        
            }
    }
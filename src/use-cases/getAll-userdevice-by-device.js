module.exports = function buildGetAllUserDeviceByDevice
(
    {
        getAllUserdeviceByDeviceDB
    }
)
    {

        if
        (
            !getAllUserdeviceByDeviceDB
        )
            {
                throw new Error("buildGetAllUserDeviceByDevice must have an getAllUserdeviceByDeviceDB");
            }

        return async function getAllUserDeviceByDevice
        (
            {
                deviceId
            }
        )
            {
                if
                (
                    !deviceId
                )
                    {
                        throw new Error("getAllUserDeviceByDevice must have an deviceId");
                    }

                const userDeviceList = await getAllUserdeviceByDeviceDB(
                    {
                        deviceId: deviceId
                    }
                );
                
                return userDeviceList;        
            }
    }
module.exports = function buildEditUserDevicePermission
(
    dataAccess
)
    {

        return async function editUserDevicePermission
        (
            userDeviceId,
            isAdmin,
            isMonitor,
            isArchiver,
        )
            {
                const response = await dataAccess.dataApi.editUserDevicePermission(
                    userDeviceId,
                    isAdmin,
                    isMonitor,
                    isArchiver,
                );
                
                return response;        
            }
    }
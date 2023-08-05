module.exports = function buildDeleteUserDevice
(
    {
        deleteUserDeviceDB
    }
)
    {

        if
        (
            !deleteUserDeviceDB
        )
            {
                throw new Error("buildDeleteUserDevice must have an deleteUserDeviceDB");
            }

        return async function deleteUserDevice
        (
            {
                userDeviceId
            }
        )
            {
                if
                (
                    !userDeviceId
                )
                    {
                        throw new Error("deleteUserDevice must have an userDeviceId");
                    }
                    
                const response = await deleteUserDeviceDB(
                    {
                        userDeviceId: userDeviceId
                    }
                );
                
                return response;        
            }
    }
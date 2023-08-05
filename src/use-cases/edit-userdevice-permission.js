module.exports = function buildEditUserDevicePermission
(
    {
        editUserDevicePermissionDB
    }
)
    {
        if
        (
            !editUserDevicePermissionDB
        )
            {
                throw new Error("buildEditUserDevicePermission must have an editUserDevicePermissionDB");
            }

        return async function editUserDevicePermission
        (
            {
                userDeviceId,
                isAdmin,
                isMonitor,
                isArchiver
            }
        )
            {
                if
                (
                    !userDeviceId
                )
                    {
                        throw new Error("editUserDevicePermission must have an userDeviceId");
                    }

                if
                (
                    typeof isAdmin === undefined
                )
                    {
                        throw new Error("editUserDevicePermission must have an isAdmin");
                    }

                if
                (
                    typeof isMonitor === undefined
                )
                    {
                        throw new Error("editUserDevicePermission must have an isMonitor");
                    }

                if
                (
                    typeof isArchiver === undefined
                )
                    {
                        throw new Error("editUserDevicePermission must have an isArchiver");
                    }
                    
                const response = await editUserDevicePermissionDB(
                    userDeviceId,
                    isAdmin,
                    isMonitor,
                    isArchiver,
                );
                
                return response;        
            }
    }
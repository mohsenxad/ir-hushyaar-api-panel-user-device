module.exports = function buildCreateEditUserDevicePermissionOptions
()
    {
        return function createEditUserDevicePermissionOptions
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
                        throw new Error("createEditUserDevicePermissionOptions must have an userDeviceId");
                    }

                if
                (
                    typeof isAdmin === undefined
                )
                    {
                        throw new Error("createEditUserDevicePermissionOptions must have an isAdmin");
                    }

                if
                (
                    typeof isMonitor === undefined
                )
                    {
                        throw new Error("createEditUserDevicePermissionOptions must have an isMonitor");
                    }

                if
                (
                    typeof isArchiver === undefined
                )
                    {
                        throw new Error("createEditUserDevicePermissionOptions must have an isArchiver");
                    }

                const userDeviceObjectId = mongoDBDriver.ObjectID(
                    userDeviceId
                );

                const filter = {
                    "_id": userDeviceObjectId
                };

                const update = {
                    "$set": {
                        isAdmin: isAdmin,
                        isMonitor: isMonitor,
                        isArchiver: isArchiver
                    }
                };

                const options = {
                    filter: filter,
                    update : update
                };

                return options;
            }
    }
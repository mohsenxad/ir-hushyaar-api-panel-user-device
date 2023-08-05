module.exports = function buildEditUserDevicePermission
(
    {
        getDb,
        createOptions,
        translateResponse
    }
)
    {
        if
        (
            !getDb
        )
            {
                throw new Error('buildEditUserDevicePermission must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildEditUserDevicePermission must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildEditUserDevicePermission must have translateResponse.')
            }

        const COLLECTION_NAME = 'userdevices';
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

                const db = await getDb();
            
                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        userDeviceId: userDeviceId,
                        isAdmin: isAdmin,
                        isMonitor: isMonitor,
                        isArchiver: isArchiver
                    }
                );

                const response = await collection.updateOne(
                    options.filter,
                    options.update
                );
                
                const result = translateResponse(
                    {
                        response: response
                    }
                );

                return result;

            }
    }
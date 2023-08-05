module.exports = function buildGetUserdeviceByDeviceAndUser
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
                throw new Error("buildGetUserdeviceByDeviceAndUser must have an getDb");
            }

        if
        (
            !createOptions
        )
            {
                throw new Error("buildGetUserdeviceByDeviceAndUser must have an createOptions");
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error("buildGetUserdeviceByDeviceAndUser must have an translateResponse");
            }

        const COLLECTION_NAME = 'userdevices';
        
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
                    !deviceId
                )
                    {
                        throw new Error("getUserdeviceByDeviceAndUser must have an deviceId");
                    }
                    
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        deviceId: deviceId,
                        userId: userId
                    }
                );

                const response = await collection.aggregate(
                    options.pipeline
                ).toArray();

                const result = translateResponse(
                    {
                        response: response[0]
                    }
                );

                return result;
            }
    }
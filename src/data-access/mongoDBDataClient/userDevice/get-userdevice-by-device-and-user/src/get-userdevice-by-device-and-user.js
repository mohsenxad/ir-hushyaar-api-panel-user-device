module.exports = function buildGetUserdeviceByDeviceAndUser
(
    getDb,
    createGetUserdeviceByDeviceAndUserOptions,
    translateGetUserdeviceByDeviceAndUserResponse
)
    {
        const COLLECTION_NAME = 'userdevices';
        
        return async function getUserdeviceByDeviceAndUser
        (
            deviceId,
            userId
        )
            {
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createGetUserdeviceByDeviceAndUserOptions(
                    deviceId,
                    userId
                );

                const response = await collection.aggregate(
                    options.pipeline
                ).toArray();

                const result = translateGetUserdeviceByDeviceAndUserResponse(
                    response[0]
                );

                return result;
            }
    }
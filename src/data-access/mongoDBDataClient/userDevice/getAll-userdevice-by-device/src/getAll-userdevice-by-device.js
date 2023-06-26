module.exports = function buildGetAllUserdeviceByDevice
(
    getDb,
    createGetAllUserdeviceByDeviceOptions,
    translateGetAllUserdeviceByDeviceResponse
)
    {
        const COLLECTION_NAME = 'userdevices';

        return async function getAllUserdeviceByDevice
        (
            deviceId
        )
            {
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createGetAllUserdeviceByDeviceOptions(
                    deviceId
                );

                const response = await collection.aggregate(
                    options.pipeline
                ).toArray();

                const result = translateGetAllUserdeviceByDeviceResponse(
                    response
                );

                return result;
            }
    }
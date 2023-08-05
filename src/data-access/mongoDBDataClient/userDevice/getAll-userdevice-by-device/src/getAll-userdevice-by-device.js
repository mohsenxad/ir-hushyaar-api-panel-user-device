module.exports = function buildGetAllUserdeviceByDevice
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
                throw new Error("buildGetAllUserdeviceByDevice must have an getDb");
            }

        if
        (
            !createOptions
        )
            {
                throw new Error("buildGetAllUserdeviceByDevice must have an createOptions");
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error("buildGetAllUserdeviceByDevice must have an translateResponse");
            }

        const COLLECTION_NAME = 'userdevices';

        return async function getAllUserdeviceByDevice
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
                        throw new Error("getAllUserdeviceByDevice must have an deviceId");
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        deviceId: deviceId
                    }
                );

                const response = await collection.aggregate(
                    options.pipeline
                ).toArray();

                const result = translateResponse(
                    {
                        response: response
                    }
                );

                return result;
            }
    }
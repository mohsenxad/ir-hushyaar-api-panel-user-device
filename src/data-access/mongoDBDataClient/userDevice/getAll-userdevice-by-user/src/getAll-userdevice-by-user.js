module.exports = function buildGetAllUserdeviceByUser
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
                throw new Error("buildGetAllUserdeviceByUser must have an getDb");
            }

        if
        (
            !createOptions
        )
            {
                throw new Error("buildGetAllUserdeviceByUser must have an createOptions");
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error("buildGetAllUserdeviceByUser must have an translateResponse");
            }

        const COLLECTION_NAME = 'userdevices';

        return async function getAllUserdeviceByUser
        (
            {
                userId
            }
        )
            {
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        userId: userId
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
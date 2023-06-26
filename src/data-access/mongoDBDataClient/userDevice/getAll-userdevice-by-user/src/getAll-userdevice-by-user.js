module.exports = function buildGetAllUserdeviceByUser
(
    getDb,
    createGetAllUserdeviceByUserOptions,
    translateGetAllUserdeviceByUserResponse
)
    {
        const COLLECTION_NAME = 'userdevices';

        return async function getAllUserdeviceByUser
        (
            userId
        )
            {
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createGetAllUserdeviceByUserOptions(
                    userId
                );

                const response = await collection.aggregate(
                    options.pipeline
                ).toArray();

                const result = translateGetAllUserdeviceByUserResponse(
                    response
                );

                return result;
            }
    }
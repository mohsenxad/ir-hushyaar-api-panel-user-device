module.exports = function buildDeleteUserDevice
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
                throw new Error('buildDeleteUserDevice must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildDeleteUserDevice must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildDeleteUserDevice must have translateResponse.')
            }
        const COLLECTION_NAME = 'userdevices';

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
                        throw new Error('deleteUserDevice must have userDeviceId.')
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        userDeviceId: userDeviceId
                    }
                );

                const response = await collection.insert(
                    options.document
                );

                const result = translateResponse(
                    {
                        response: response
                    }
                );

                return result;
            }
    }
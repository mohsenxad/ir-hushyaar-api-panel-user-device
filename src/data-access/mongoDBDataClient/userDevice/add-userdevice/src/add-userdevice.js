module.exports =  function buildAddUserDevice
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
                throw new Error('buildAddUserDevice must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildAddUserDevice must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildAddUserDevice must have translateResponse.')
            }
        const COLLECTION_NAME = 'userdevices';

        return async function addUserDevice
        (
            {
                userDevice
            }
        )
            {
                if
                (
                    !userDevice
                )
                    {
                        throw new Error('addUserDevice must have userDevice.')
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        userDevice: userDevice
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
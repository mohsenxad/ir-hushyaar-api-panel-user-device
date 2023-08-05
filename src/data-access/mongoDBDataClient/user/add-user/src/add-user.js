module.exports = function buildAddUser
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
                throw new Error('buildAddUser must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildAddUser must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildAddUser must have translateResponse.')
            }
        const COLLECTION_NAME = 'users';

        return async function addUser
        (
            {
                user
            }
        )
            {
                if
                (
                    !user
                )
                    {
                        throw new Error('addUser must have user.')
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        user: user
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
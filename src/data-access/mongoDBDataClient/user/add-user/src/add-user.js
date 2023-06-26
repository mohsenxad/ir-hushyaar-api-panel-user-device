module.exports = function buildAddUser
(
    getDb,
    createAddUserOptions,
    translateAddUserResponse
)
    {
        const COLLECTION_NAME = 'users';

        return async function addUser
        (
            user
        )
            {
                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createAddUserOptions(
                    user
                );

                const response = await collection.insert(
                    options.document
                );

                const result = translateAddUserResponse(
                    response
                );

                return result;
            }
    }
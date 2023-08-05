module.exports = function buildGetUserByMobileNumber
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
                throw new Error('buildGetUserByMobileNumber must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildGetUserByMobileNumber must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildGetUserByMobileNumber must have translateResponse.')
            }

        const COLLECTION_NAME = 'users';

        return async function getUserByMobileNumber
        (
            {
                mobileNumber
            }
        )
            {
                if
                (
                    !mobileNumber
                )
                    {
                        throw new Error('getUserByMobileNumber must have mobileNumber.')
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        mobileNumber: mobileNumber
                    }
                );

                const response = await collection.findOne(
                    options.filter
                );

                const result = translateResponse(
                    {
                        response: response
                    }
                );
                
                return result;
                
            }
    }
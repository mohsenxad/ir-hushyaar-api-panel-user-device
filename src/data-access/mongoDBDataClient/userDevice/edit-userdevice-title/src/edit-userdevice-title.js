module.exports = function buildEditUserdeviceTitle
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
                throw new Error('buildEditUserdeviceTitle must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildEditUserdeviceTitle must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildEditUserdeviceTitle must have translateResponse.')
            }

        const COLLECTION_NAME = 'userdevices';
        return async function editUserdeviceTitle
        (
            {
                userDeviceId,
                title
            }
        )
            {
                if
                (
                    !userDeviceId
                )
                    {
                        throw new Error("editUserdeviceTitle must have an userDeviceId");
                    }

                if
                (
                    !title
                )
                    {
                        throw new Error("editUserdeviceTitle must have an title");
                    }

                const db = await getDb();
                
                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        userDeviceId: userDeviceId,
                        title: title
                    }
                );

                const response = await collection.updateOne(
                    options.filter,
                    options.update
                );
                
                const result = translateResponse(
                    {
                        response: response
                    }
                );

                return result;
            }
    }
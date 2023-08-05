module.exports = function buildGetDeviceByManufactureId
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
                throw new Error('buildGetDeviceByManufactureId must have getDb.')
            }

        if
        (
            !createOptions
        )
            {
                throw new Error('buildGetDeviceByManufactureId must have createOptions.')
            }

        if
        (
            !translateResponse
        )
            {
                throw new Error('buildGetDeviceByManufactureId must have translateResponse.')
            }

        const COLLECTION_NAME = 'devices';
        return async function getDeviceByManufactureId
        (
            {
                manufactureId
            }
        )
            {
                if
                (
                    !manufactureId
                )
                    {
                        throw new Error('getDeviceByManufactureId must have manufactureId.')
                    }

                const db = await getDb();

                const collection = db.collection(
                    COLLECTION_NAME
                );

                const options = createOptions(
                    {
                        manufactureId: manufactureId
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
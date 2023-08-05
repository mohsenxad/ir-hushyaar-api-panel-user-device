module.exports = function buildCreateDeleteUserDeviceOptions
()
    {
        return function createDeleteUserDeviceOptions
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
                        throw new Error('createDeleteUserDeviceOptions must have userDeviceId.')
                    }

                const options = {};

                return options;
            }
    }
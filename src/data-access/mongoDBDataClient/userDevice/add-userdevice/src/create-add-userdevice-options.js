module.exports =  function buildCreateAddUserDeviceOptions
()
    {
        return function createAddUserDeviceOptions
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
                        throw new Error('createAddUserOptions must have userDevice.')
                    }

                const document = userDevice.toBson();

                const options = {
                    document: document
                };
                
                return options;
            }
    }
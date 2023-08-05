module.exports = function buildCreateAddUserOptions
()
    {
        return function createAddUserOptions
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
                        throw new Error('createAddUserOptions must have user.')
                    }

                const document = user.toBson();

                const options = {
                    document: document
                };
                
                return options;
            }
    }
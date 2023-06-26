module.exports = function buildCreateAddUserOptions
()
    {
        return function createAddUserOptions
        (
            user
        )
            {
                const document = user.toBson();

                const options = {
                    document: document
                };
                
                return options;
            }
    }
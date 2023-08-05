module.exports = function buildCreateGetUserByMobileNumberOptions
()
    {
        return function createGetUserByMobileNumberOptions
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
                        throw new Error('createGetUserByMobileNumberOptions must have mobileNumber.')
                    }

                const filter = {
                    "mobileNumber": mobileNumber
                };

                const options = {
                    filter: filter
                };

                return options;
            }
    }
module.exports = function buildTranslateGetUserByMobileNumberResponse
()
    {
        return function translateGetUserByMobileNumberResponse
        (
            {
                response
            }
        )
            {
                if
                (
                    !response
                )
                    {
                        throw new Error('translateGetUserByMobileNumberResponse must have response.')
                    }

                return response;
            }
    }
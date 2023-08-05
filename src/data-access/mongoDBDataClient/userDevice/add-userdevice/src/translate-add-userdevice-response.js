module.exports = function buildTranslateAddUserDeviceResponse
()
    {
        return function translateAddUserDeviceResponse
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
                        throw new Error('translateAddUserDeviceResponse must have response.')
                    }
                return response;
            }
    }
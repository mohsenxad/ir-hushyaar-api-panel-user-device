module.exports = function buildTranslateDeleteUserDeviceResponse
()
    {
        return function translateDeleteUserDeviceResponse
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
                        throw new Error('translateDeleteUserDeviceResponse must have response.')
                    }
                    
                return response;
            }
    }
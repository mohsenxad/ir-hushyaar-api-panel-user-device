module.exports = function buildTranslateGetAllUserdeviceByDeviceResponse
()
    {
        return function translateGetAllUserdeviceByDeviceResponse
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
                        throw new Error("translateGetAllUserdeviceByDeviceResponse must have an response");
                    }
                    
                return response;
            }
    }
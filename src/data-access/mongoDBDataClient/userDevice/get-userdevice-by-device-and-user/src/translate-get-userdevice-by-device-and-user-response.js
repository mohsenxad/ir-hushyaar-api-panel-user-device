module.exports = function buildTranslateGetUserdeviceByDeviceAndUserResponse
()
    {
        return function translateGetUserdeviceByDeviceAndUserResponse
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
                        throw new Error("translateGetUserdeviceByDeviceAndUserResponse must have an response");
                    }
                return response;
            }
    }
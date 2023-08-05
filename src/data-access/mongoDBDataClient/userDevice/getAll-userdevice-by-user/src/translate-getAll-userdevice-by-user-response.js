module.exports = function buildTranslateGetAllUserdeviceByUserResponse
()
    {
        return function translateGetAllUserdeviceByUserResponse
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
                        throw new Error("translateGetAllUserdeviceByUserResponse must have an response");
                    }
                    
                return response;
            }
    }
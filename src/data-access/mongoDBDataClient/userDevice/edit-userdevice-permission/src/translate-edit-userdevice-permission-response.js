module.exports = function buildTranslateEditUserDevicePermissionResponse
()
    {
        return function translateEditUserDevicePermissionResponse
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
                        throw new Error("translateEditUserDevicePermissionResponse must have an response");
                    }
                return response;
            }
    }
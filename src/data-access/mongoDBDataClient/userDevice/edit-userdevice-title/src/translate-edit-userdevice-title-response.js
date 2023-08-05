module.exports = function buildTranslateEditUserdeviceTitleResponse
()
    {
        return function translateEditUserdeviceTitleResponse
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
                        throw new Error("translateEditUserdeviceTitleResponse must have an response");
                    }
                return response;
            }
    }
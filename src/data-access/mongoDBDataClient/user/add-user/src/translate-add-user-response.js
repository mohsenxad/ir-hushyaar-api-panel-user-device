module.exports = function buildTranslateAddUserResponse
()
    {
        return function translateAddUserResponse
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
                        throw new Error('translateAddUserResponse must have response.')
                    }
                return response;
            }
    }
module.exports = function buildTranslateAddUserDeviceResponse()
    {
        return function translateAddUserDeviceResponse(
            response
        )
            {
                return response.insertedId;
            }
    }
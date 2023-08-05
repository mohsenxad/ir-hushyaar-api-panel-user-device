module.exports = function buildTranslateGetDeviceByManufactureIdResponse
()
    {
        return function translateGetDeviceByManufactureIdResponse
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
                        throw new Error('translateGetDeviceByManufactureIdResponse must have response.')
                    }

                return response;
            }
    }
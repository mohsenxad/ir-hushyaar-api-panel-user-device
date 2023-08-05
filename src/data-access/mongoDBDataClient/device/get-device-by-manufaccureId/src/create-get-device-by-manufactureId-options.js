module.exports = function buildCreateGetDeviceByManufactureIdOptions
()
    {
        return function createGetDeviceBManufactureIdOptions
        (
            {
                manufactureId
            }
        )
            {
                if
                (
                    !manufactureId
                )
                    {
                        throw new Error('createGetDeviceByTokenOptions must have manufactureId.')
                    }

                const filter = {
                    "manufactureId": manufactureId
                };

                const options = {
                    filter: filter
                };

                return options;
            }
    }
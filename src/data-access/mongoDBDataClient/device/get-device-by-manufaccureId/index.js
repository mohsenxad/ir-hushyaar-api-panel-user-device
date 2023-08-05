const buildTranslateGetDeviceByManufactureIdResponse = require('./src/translate-get-device-by-manufactureId-response');
const buildCreateGetDeviceByManufactureIdOptions = require('./src/create-get-device-by-manufactureId-options');
const buildGetDeviceByManufactureId = require('./src/get-device-by-manufactureId');

module.exports = function
(
    {
        getDb
    }
)
    {
        
        const translateGetDeviceByManufactureIdResponse = buildTranslateGetDeviceByManufactureIdResponse();

        const createGetDeviceByManufactureIdOptions = buildCreateGetDeviceByManufactureIdOptions();

        const getDeviceByManufactureId = buildGetDeviceByManufactureId(
            {
                getDb: getDb,
                createOptions: createGetDeviceByManufactureIdOptions,
                translateResponse: translateGetDeviceByManufactureIdResponse
            }
        );

        return Object.freeze(
            {
                getDeviceByManufactureId
            }
        )
    }
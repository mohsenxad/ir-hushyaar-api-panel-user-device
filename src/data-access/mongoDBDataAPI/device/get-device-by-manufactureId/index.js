const buildTranslateGetDeviceByManufactureIdResponse = require('./src/translate-get-device-by-manufactureId-response');
const buildCreateGetDeviceByManufactureIdRequest = require('./src/create-get-device-by-manufactureId-request');
const buildGetDeviceByManufactureId = require('./src/get-device-by-manufactureId');

module.exports = function(
    APPID,
    APIKEY,
    proxyAgent,
    fetch
)
    {
        const translateGetDeviceByManufactureIdResponse = buildTranslateGetDeviceByManufactureIdResponse();
        const createGetDeviceByManufactureIdRequest = buildCreateGetDeviceByManufactureIdRequest(
            APIKEY,
            proxyAgent
        );
        const getDeviceByManufactureId = buildGetDeviceByManufactureId(
            APPID,
            fetch,
            createGetDeviceByManufactureIdRequest,
            translateGetDeviceByManufactureIdResponse
        );

        return Object.freeze(
            {
                getDeviceByManufactureId
            }
        )
    }
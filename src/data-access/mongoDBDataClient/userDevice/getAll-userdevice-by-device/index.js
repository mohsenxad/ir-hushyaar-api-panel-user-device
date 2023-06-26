const buildTranslateGetAllUserdeviceByDeviceResponse = require('./src/translate-getAll-userdevice-by-device-response');
const buildCreateGetAllUserdeviceByDeviceOptions = require('./src/create-getAll-userdevice-by-device-options');
const buildGetAllUserdeviceByDevice = require('./src/getAll-userdevice-by-device');

module.exports = function(
    mongoDBDriver,
    getDb
)
    {
        
        const translateGetAllUserdeviceByDeviceResponse = buildTranslateGetAllUserdeviceByDeviceResponse();

        const createGetAllUserdeviceByDeviceOptions = buildCreateGetAllUserdeviceByDeviceOptions(
            mongoDBDriver
        );

        const getAllUserdeviceByDevice = buildGetAllUserdeviceByDevice(
            getDb,
            createGetAllUserdeviceByDeviceOptions,
            translateGetAllUserdeviceByDeviceResponse
        );

        const services = Object.freeze(
            {
                getAllUserdeviceByDevice
            }
        );

        return services;
    }
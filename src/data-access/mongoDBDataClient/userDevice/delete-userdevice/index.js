const buildTranslateDeleteUserDeviceResponse = require('./src/translate-delete-userdevice-response');
const buildCreateDeleteUserDeviceOptions = require('./src/create-delete-userdevice-options');
const buildDeleteUserDevice = require('./src/delete-userdevice');

module.exports = function
(
    {
        getDb
    }
)
    {
        
        const translateDeleteUserDeviceResponse = buildTranslateDeleteUserDeviceResponse();

        const createDeleteUserDeviceOptions = buildCreateDeleteUserDeviceOptions();

        const deleteUserDevice = buildDeleteUserDevice(
            {
                getDb: getDb,
                createOptions: createDeleteUserDeviceOptions,
                translateResponse: translateDeleteUserDeviceResponse
            }
        );

        const services = Object.freeze(
            {
                deleteUserDevice
            }
        );

        return services;
    }
const buildTranslateAddUserDeviceResponse = require('./src/translate-add-userdevice-response');
const buildCreateAddUserDeviceOptions = require('./src/create-add-userdevice-options');
const buildAddUserDevice = require('./src/add-userdevice');

module.exports = function
(
    {
        getDb
    }
)
    {
        
        const translateAddUserDeviceResponse = buildTranslateAddUserDeviceResponse();

        const createAddUserDeviceOptions = buildCreateAddUserDeviceOptions();

        const addUserDevice = buildAddUserDevice(
            {
                getDb: getDb,
                createOptions: createAddUserDeviceOptions,
                translateResponse: translateAddUserDeviceResponse
            }
        );

        const services = Object.freeze(
            {
                addUserDevice
            }
        );

        return services;
    }
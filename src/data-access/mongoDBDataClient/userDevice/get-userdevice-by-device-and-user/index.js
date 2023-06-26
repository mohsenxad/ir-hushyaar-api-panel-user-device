const buildTranslateGetUserdeviceByDeviceAndUserResponse = require('./src/translate-get-userdevice-by-device-and-user-response');
const buildCreateGetUserdeviceByDeviceAndUserOptions = require('./src/create-get-userdevice-by-device-and-user-options');
const buildGetUserdeviceByDeviceAndUser = require('./src/get-userdevice-by-device-and-user');

module.exports = function(
    mongoDBDriver,
    getDb
)
    {
        
        const translateGetUserdeviceByDeviceAndUserResponse = buildTranslateGetUserdeviceByDeviceAndUserResponse();

        const createGetUserdeviceByDeviceAndUserOptions = buildCreateGetUserdeviceByDeviceAndUserOptions(
            mongoDBDriver
        );

        const getUserdeviceByDeviceAndUser = buildGetUserdeviceByDeviceAndUser(
            getDb,
            createGetUserdeviceByDeviceAndUserOptions,
            translateGetUserdeviceByDeviceAndUserResponse
        );

        const services = Object.freeze(
            {
                getUserdeviceByDeviceAndUser
            }
        );

        return services;
    }
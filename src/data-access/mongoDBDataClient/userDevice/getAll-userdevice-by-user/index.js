const buildTranslateGetAllUserdeviceByUserResponse = require('./src/translate-getAll-userdevice-by-user-response');
const buildCreateGetAllUserdeviceByUserOptions = require('./src/create-getAll-userdevice-by-user-options');
const buildGetAllUserdeviceByUser = require('./src/getAll-userdevice-by-user');

module.exports = function(
    mongoDBDriver,
    getDb
)
    {
        
        const translateGetAllUserdeviceByUserResponse = buildTranslateGetAllUserdeviceByUserResponse();

        const createGetAllUserdeviceByUserOptions = buildCreateGetAllUserdeviceByUserOptions(
            mongoDBDriver
        );

        const getAllUserdeviceByUser = buildGetAllUserdeviceByUser(
            getDb,
            createGetAllUserdeviceByUserOptions,
            translateGetAllUserdeviceByUserResponse
        );

        const services = Object.freeze(
            {
                getAllUserdeviceByUser
            }
        );

        return services;
    }
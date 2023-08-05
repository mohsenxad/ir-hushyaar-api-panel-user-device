const buildTranslateEditUserdeviceTitleResponse = require('./src/translate-edit-userdevice-title-response');
const buildCreateEditUserdeviceTitleOpions = require('./src/create-edit-userdevice-title-options');
const buildEditUserdeviceTitle = require('./src/edit-userdevice-title');

module.exports = function
(
    {
        mongoDBDriver,
        getDb
    }
)
    {
        
        const translateEditUserdeviceTitleResponse = buildTranslateEditUserdeviceTitleResponse();

        const createEditUserdeviceTitleOpions = buildCreateEditUserdeviceTitleOpions(
            {
                mongoDBDriver: mongoDBDriver
            }
        );

        const editUserdeviceTitle = buildEditUserdeviceTitle(
            {
                getDb: getDb,
                createOptions: createEditUserdeviceTitleOpions,
                translateResponse: translateEditUserdeviceTitleResponse
            }
        );

        return Object.freeze(
            {
                editUserdeviceTitle
            }
        )
    }
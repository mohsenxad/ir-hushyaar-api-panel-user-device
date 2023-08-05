const buildTranslateEditUserDevicePermissionResponse = require('./src/translate-edit-userdevice-permission-response');
const buildCreateEditUserDevicePermissionOptions = require('./src/create-edit-userdevice-permission-options');
const buildEditUserDevicePermission = require('./src/edit-userdevice-permission');

module.exports = function
(
    {
        mongoDBDriver,
        getDb
    }
)
    {
        
        const translateEditUserDevicePermissionResponse = buildTranslateEditUserDevicePermissionResponse();

        const createEditUserDevicePermissionOptions = buildCreateEditUserDevicePermissionOptions(
            {
                mongoDBDriver: mongoDBDriver
            }
        );

        const editUserDevicePermission = buildEditUserDevicePermission(
            {
                getDb: getDb,
                createOptions: createEditUserDevicePermissionOptions,
                translateResponse: translateEditUserDevicePermissionResponse
            }
        );

        return Object.freeze(
            {
                editUserDevicePermission
            }
        )
    }
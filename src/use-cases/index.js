const buildAddUserDevice = require('./add-userdevice');
const buildEditUserDevicePermission = require('./edit-userdevice-permission');
const buildDeleteUserDevice = require('./delete-userdevice');
const buildGetAllUserDeviceByDevice = require('./getAll-userdevice-by-device');
const buildGetAllUserDeviceByUser = require('./getAll-userdevice-by-user');
const buildGetUserdeviceByDeviceAndUser = require('./get-userdevice-by-device-and-user');
const buildEditUserDeviceTitle = require('./edit-userdevice-title');
const buildSetup = require('./setup');




module.exports = function(
    MONGODB_DATAAPI_APPID,
    MONGODB_DATAAPI_APIKEY,
    proxyUrl,
    {
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {

        const dataAccess = require('../data-access')(
            MONGODB_DATAAPI_APPID,
            MONGODB_DATAAPI_APIKEY,
            proxyUrl,
            {
                MONGODB_URI: MONGODB_URI,
                DATABASE_NAME: DATABASE_NAME
            }
        )

        const addUserDevice = buildAddUserDevice(dataAccess);
        const editUserDevicePermission = buildEditUserDevicePermission(dataAccess);
        const deleteUserDevice = buildDeleteUserDevice(dataAccess);
        const getAllUserDeviceByDevice = buildGetAllUserDeviceByDevice(dataAccess);
        const getAllUserDeviceByUser = buildGetAllUserDeviceByUser(dataAccess);
        const getUserdeviceByDeviceAndUser = buildGetUserdeviceByDeviceAndUser(
            dataAccess.dataClient.getUserdeviceByDeviceAndUser
        );
        const editUserDeviceTitle = buildEditUserDeviceTitle(dataAccess);
        const setup = buildSetup(dataAccess);

        return Object.freeze(
            {
                addUserDevice,
                editUserDevicePermission,
                deleteUserDevice,
                getAllUserDeviceByDevice,
                getAllUserDeviceByUser,
                getUserdeviceByDeviceAndUser,
                editUserDeviceTitle,
                setup
            }
        );
    }
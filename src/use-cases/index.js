const buildAddUserDevice = require('./add-userdevice');
const buildEditUserDevicePermission = require('./edit-userdevice-permission');
const buildDeleteUserDevice = require('./delete-userdevice');
const buildGetAllUserDeviceByDevice = require('./getAll-userdevice-by-device');
const buildGetAllUserDeviceByUser = require('./getAll-userdevice-by-user');
const buildGetAllUserDeviceByDeviceAndUser = require('./get-userdevice-by-device-and-user');
const buildEditUserDeviceTitle = require('./edit-userdevice-title');
const buildSetup = require('./setup');




module.exports = function(
    MONGODB_DATAAPI_APPID,
    MONGODB_DATAAPI_APIKEY,
    proxyUrl
    ){

    const dataAccess = require('../data-access')(
        MONGODB_DATAAPI_APPID,
        MONGODB_DATAAPI_APIKEY,
        proxyUrl
    )

    const addUserDevice = buildAddUserDevice(dataAccess);
    const editUserDevicePermission = buildEditUserDevicePermission(dataAccess);
    const deleteUserDevice = buildDeleteUserDevice(dataAccess);
    const getAllUserDeviceByDevice = buildGetAllUserDeviceByDevice(dataAccess);
    const getAllUserDeviceByUser = buildGetAllUserDeviceByUser(dataAccess);
    const getAllUserDeviceByDeviceAndUser = buildGetAllUserDeviceByDeviceAndUser(dataAccess);
    const editUserDeviceTitle = buildEditUserDeviceTitle(dataAccess);
    const setup = buildSetup(dataAccess);

    return Object.freeze(
        {
            addUserDevice,
            editUserDevicePermission,
            deleteUserDevice,
            getAllUserDeviceByDevice,
            getAllUserDeviceByUser,
            getAllUserDeviceByDeviceAndUser,
            editUserDeviceTitle,
            setup
        }
    );
}
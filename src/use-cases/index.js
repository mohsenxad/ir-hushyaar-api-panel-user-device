const buildAddUserDevice = require('./add-userdevice');
const buildEditUserDevicePermission = require('./edit-userdevice-permission');
const buildDeleteUserDevice = require('./delete-userdevice');
const buildGetAllUserDeviceByDevice = require('./getAll-userdevice-by-device');
const buildGetAllUserDeviceByUser = require('./getAll-userdevice-by-user');
const buildGetUserdeviceByDeviceAndUser = require('./get-userdevice-by-device-and-user');
const buildEditUserDeviceTitle = require('./edit-userdevice-title');
const buildSetup = require('./setup');




module.exports = function(
    {
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {

        const models = require('../userdevice');

        const dataAccess = require('../data-access')(
            {
                MONGODB_URI: MONGODB_URI,
                DATABASE_NAME: DATABASE_NAME
            }
        )

        const addUserDevice = buildAddUserDevice(
            {
                addUserDB: dataAccess.dataClient.user.addUser,
                addUserDeviceDB:dataAccess.dataClient.userDevice.addUserDevice,
                getUserByMobileNumberDB: dataAccess.dataClient.user.getUserByMobileNumber,
                getUserDeviceByDeviceAndUserDB: dataAccess.dataClient.userDevice.getUserdeviceByDeviceAndUser,
                makeUser: models.makeUser,
                makeUserDevice: models.makeUserDevice
            }
        );

        const editUserDevicePermission = buildEditUserDevicePermission(
            {
                editUserDevicePermissionDB: dataAccess.dataClient.userDevice.editUserDevicePermission
            }
        );

        const deleteUserDevice = buildDeleteUserDevice(
            {
                deleteUserDeviceDB: dataAccess.dataClient.userDevice.deleteUserDevice
            }
        );

        
        const getAllUserDeviceByDevice = buildGetAllUserDeviceByDevice(
            {
                getAllUserdeviceByDeviceDB: dataAccess.dataClient.userDevice.getAllUserdeviceByDevice
            }
        );

        
        const getAllUserDeviceByUser = buildGetAllUserDeviceByUser(
            {

                getAllUserdeviceByUserDB: dataAccess.dataClient.userDevice.getAllUserdeviceByUser
            }
        );
        const getUserdeviceByDeviceAndUser = buildGetUserdeviceByDeviceAndUser(
            {
                getUserdeviceByDeviceAndUserDB: dataAccess.dataClient.userDevice.getUserdeviceByDeviceAndUser
            }
        );
        const editUserDeviceTitle = buildEditUserDeviceTitle(
            {
                editUserDeviceTitleDB: dataAccess.dataClient.userDevice.editUserdeviceTitle
            }
        );
        
        const setup = buildSetup(
            {
                addUserDeviceDB: dataAccess.dataClient.userDevice.addUserDevice,
                getDeviceByManufactureIdDB: dataAccess.dataClient.device.getDeviceByManufactureId,
                getUserDeviceByDeviceAndUserDB: dataAccess.dataClient.userDevice.getUserdeviceByDeviceAndUser,
                makeUserDevice: models.makeUserDevice
            }
        );

        const servies =  Object.freeze(
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

        return servies;
    }
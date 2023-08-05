module.exports = function(
    {
        mongoDBDriver,
        getDb
    }
)
    {
        
        const { addUserDevice } = require('./add-userdevice')(
            {
                getDb: getDb
            }
        );

        const { deleteUserDevice } = require('./delete-userdevice')(
            {
                getDb: getDb
            }
        );

        const { getUserdeviceByDeviceAndUser } = require('./get-userdevice-by-device-and-user')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        );

        
        const { editUserdeviceTitle } = require('./edit-userdevice-title')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        );

        const { editUserDevicePermission } = require('./edit-userdevice-permission')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        )

        const { getAllUserdeviceByDevice } = require('./getAll-userdevice-by-device')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        );

        const { getAllUserdeviceByUser } = require('./getAll-userdevice-by-user')(
            {
                getDb: getDb,
                mongoDBDriver: mongoDBDriver
            }
        )

        const services =  Object.freeze(
            {
                addUserDevice,
                deleteUserDevice,
                getUserdeviceByDeviceAndUser,
                editUserdeviceTitle,
                editUserDevicePermission,
                getAllUserdeviceByDevice,
                getAllUserdeviceByUser
            }
        );

        return services;
    }
const userDeviceServices = require('../userdevice');

module.exports = function buildSetup
(
    dataAccess
)
    {
        return async function setup
        (
            userId,
            manufactureId
        )
            {
                const foundDevice = await dataAccess.dataApi.getDeviceByManufactureId(manufactureId);
                if(foundDevice)
                    {
                        const foundExistingUserDevice = await dataAccess.dataApi.getUserDeviceByDeviceAndUser(
                            foundDevice._id,
                            userId
                        );

                        if
                        (
                            foundExistingUserDevice
                        )
                            {
                                if(
                                    foundExistingUserDevice.isOwner == true  
                                )
                                    {
                                        throw new Error("شما در حال حاضر صاحب دستگاه میباشید.")
                                    }
                                else
                                    {
                                        throw new Error("دستگاه متعلق به فرد دیگری هست.");
                                    }
                                
                            }
                        else
                            {
                                const userDeviceInfo = {
                                    user: userId,
                                    device:foundDevice._id,
                                    title : foundDevice.title,
                                    isOwner: true,
                                    isAdmin: true,
                                    isMonitor: true,
                                    isArchiver: true
                                }
                                const userDevice = userDeviceServices.makeUserDevice(userDeviceInfo);
                                const addedUserDeviceId = await dataAccess.dataApi.addUserDevice(userDevice);
                                return addedUserDeviceId;
                            }
                    }
                else
                    {
                        throw new Error("No device found with given manufactureId")
                    }
            }
    }
module.exports = function buildSetup
(
    {
        getDeviceByManufactureIdDB,
        getUserDeviceByDeviceAndUserDB,
        addUserDeviceDB,
        makeUserDevice
    }
)
    {
        if
        (
            !getDeviceByManufactureIdDB
        )
            {
                throw new Error("buildSetup must have an getDeviceByManufactureIdDB");
            }

        if
        (
            !getUserDeviceByDeviceAndUserDB
        )
            {
                throw new Error("buildSetup must have an getUserDeviceByDeviceAndUserDB");
            }

        if
        (
            !addUserDeviceDB
        )
            {
                throw new Error("buildSetup must have an addUserDeviceDB");
            }

        if
        (
            !makeUserDevice
        )
            {
                throw new Error("buildSetup must have an makeUserDevice");
            }
        return async function setup
        (
            {
                userId,
                manufactureId
            }
        )
            {
                if
                (
                    !userId
                )
                    {
                        throw new Error("setup must have an userId");
                    }

                if
                (
                    !manufactureId
                )
                    {
                        throw new Error("setup must have an manufactureId");
                    }
                    
                const foundDevice = await getDeviceByManufactureIdDB(
                    {
                        manufactureId: manufactureId
                    }
                );

                if
                (
                    foundDevice
                )
                    {
                        const foundExistingUserDevice = await getUserDeviceByDeviceAndUserDB(
                            {
                                deviceId: foundDevice._id,
                                userId: userId
                            }
                        );

                        if
                        (
                            foundExistingUserDevice
                        )
                            {
                                if
                                (
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
                                };

                                const userDevice = userDeviceServices.makeUserDevice(
                                    userDeviceInfo
                                );

                                const addedUserDeviceId = await addUserDeviceDB(
                                    {
                                        userDevice: userDevice
                                    }
                                );
                                
                                return addedUserDeviceId;
                            }
                    }
                else
                    {
                        throw new Error("No device found with given manufactureId")
                    }
            }
    }
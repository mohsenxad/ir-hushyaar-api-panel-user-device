
module.exports =  function buildAddUserDevice
(
    {
        getUserByMobileNumberDB,
        getUserDeviceByDeviceAndUserDB,
        makeUser,
        addUserDB,
        makeUserDevice,
        addUserDeviceDB
    }
)
    {
        if
        (
            !getUserByMobileNumberDB
        )
            {
                throw new Error("buildAddUserDevice must have an getUserByMobileNumberDB");
            }

        if
        (
            !getUserDeviceByDeviceAndUserDB
        )
            {
                throw new Error("buildAddUserDevice must have an getUserDeviceByDeviceAndUserDB");
            }

        if
        (
            !makeUser
        )
            {
                throw new Error("buildAddUserDevice must have an makeUser");
            }
            

        if
        (
            !addUserDB
        )
            {
                throw new Error("buildAddUserDevice must have an addUserDB");
            }

            
        if
        (
            !makeUserDevice
        )
            {
                throw new Error("buildAddUserDevice must have an makeUserDevice");
            }
            

        if
        (
            !addUserDeviceDB
        )
            {
                throw new Error("buildAddUserDevice must have an addUserDeviceDB");
            }
            
        return async function addUserDevice
        (
            {
                userId,
                deviceId,
                userDeviceInfo
            }
        )
            {
                if
                (
                    !userId
                )
                    {
                        throw new Error("addUserDevice must have an userId");
                    }

                if
                (
                    !deviceId
                )
                    {
                        throw new Error("addUserDevice must have an deviceId");
                    }

                if
                (
                    !userDeviceInfo
                )
                    {
                        throw new Error("addUserDevice must have an userDeviceInfo");
                    }

                try 
                    {
                        const foundUserByMobileNumber = await getUserByMobileNumberDB(
                            {
                                mobileNumber: userDeviceInfo.mobileNumber
                            }
                        );

                        if 
                        (
                            foundUserByMobileNumber
                        )
                            {
                                const foundExistingUserDevice = await getUserDeviceByDeviceAndUserDB(
                                    {
                                        deviceId: deviceId,
                                        userId: foundUserByMobileNumber._id
                                    }
                                );

                                if 
                                (
                                    foundExistingUserDevice
                                )
                                    {
                                        throw Error("User Has Access to this Device");
                                    }
                                else 
                                    {
                                        userDeviceInfo.user = foundUserByMobileNumber._id;
                                    }
                            }
                        else
                            {
                                const user = makeUser(
                                    userDeviceInfo
                                );

                                const createUserId = await addUserDB(
                                    user
                                );

                                userDeviceInfo.user = createUserId;
                            }


                        const foundDevice = await getUserDeviceByDeviceAndUserDB(
                            deviceId,
                            userId
                        );

                        if
                        (
                            foundDevice
                        )
                            {
                                userDeviceInfo.title = foundDevice.title;

                                const userDevice = makeUserDevice(
                                    userDeviceInfo
                                );

                                const response = await addUserDeviceDB(
                                    {
                                        userDevice: userDevice
                                    }
                                );

                                return response;
                            }

                        else
                            {
                                throw new Error('No Device Found');
                            }
                    }
                catch (error)
                    {
                        throw error;
                    }

            }
    }
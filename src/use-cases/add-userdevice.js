const userDeviceServices = require('../userdevice');


module.exports = function buildAddUserDevice(dataAccess){

    return async function addUserDevice(
        userId,
        deviceId,
        userDeviceInfo
    ){
        try {

            const foundUserByMobileNumber = await dataAccess.dataApi.getUserByMobileNumber(userDeviceInfo.mobileNumber);

            if(foundUserByMobileNumber)
                {
                    const foundExistingUserDevice = await dataAccess.dataApi.getUserDeviceByDeviceAndUser(
                        deviceId,
                        foundUserByMobileNumber._id
                    );

                    if(foundExistingUserDevice)
                        {
                            throw Error("User Has Access to this Device")
                        }
                    else
                        {
                            userDeviceInfo.user = foundUserByMobileNumber._id;
                        }

                }
            else
                {
                    const user = userDeviceServices.makeUser(userDeviceInfo);
                    const createUserId = await dataAccess.dataApi.addUser(user);
                    userDeviceInfo.user = createUserId;
                }


            const foundDevice = await dataAccess.dataApi.getUserDeviceByDeviceAndUser(
                deviceId,
                userId
            );
    
            if(foundDevice)
                {
                    userDeviceInfo.title = foundDevice.title;
                    const userDevice = userDeviceServices.makeUserDevice(userDeviceInfo);
                    const response = await dataAccess.dataApi.addUserDevice(userDevice);
                    return response;
                }
            else
                {
                    throw new Error('No Device Found');
                }
        } catch (error) {
            throw error;
        }
                
    }
}
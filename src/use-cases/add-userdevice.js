const makeUserDevice = require('../userdevice');


module.exports = function buildAddUserDevice(dataAccess){

    return async function addUserDevice(
        userDeviceInfo
    ){
        const userDevice = makeUserDevice(userDeviceInfo);
        const response = await dataAccess.dataApi.addUserDevice(userDevice);
        return response;        
    }
}
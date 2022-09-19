const makeUserDevice = require('../userdevice');
const dataAccess = require('../data-access')

console.log(dataAccess);


module.exports = function buildAddUserDevice(){

    return async function addUserDevice(
        userDeviceInfo
    ){
        const userDevice = makeUserDevice(userDeviceInfo);
        const response = await dataAccess.dataApi.addUserDevice(userDevice);
        return response;        
    }
}
module.exports = function buildDeleteUserDevice(dataAccess){

    return async function deleteUserDevice(
        userDeviceId
    ){
        const response = await dataAccess.dataApi.deleteUserDevice(
            userDeviceId
        )
        return response;        
    }
}
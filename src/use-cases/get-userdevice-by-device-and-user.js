module.exports = function buildGetAllUserDeviceByDeviceAndUser(dataAccess){

    return async function getAllUserDeviceByDeviceAndUser(
        deviceId,
        userId
    ){
        const response = await dataAccess.dataApi.getAllUserDeviceByDeviceAndUser(
            deviceId,
            userId
        )
        return response;        
    }
}
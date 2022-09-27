module.exports = function buildGetAllUserDeviceByDevice(dataAccess){

    return async function getAllUserDeviceByDevice(
        deviceId
    ){
        const userDeviceList = await dataAccess.dataApi.getAllUserDeviceByDevice(
            deviceId
        )
        return userDeviceList;        
    }
}
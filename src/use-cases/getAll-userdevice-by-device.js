module.exports = function buildGetAllUserDeviceByDevice(dataAccess){

    return async function getAllUserDeviceByDevice(
        deviceId
    ){
        const response = await dataAccess.dataApi.getAllUserDeviceByDevice(
            deviceId
        )
        return response;        
    }
}
module.exports = function buildGetAllUserDeviceByUser(dataAccess){

    return async function getAllUserDeviceByUser(
        userId
    ){
        const response = await dataAccess.dataApi.getAllUserDeviceByUser(
            userId
        )
        return response;        
    }
}
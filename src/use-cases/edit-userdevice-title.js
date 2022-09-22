module.exports = function buildEditUserDeviceTitle(dataAccess){

    return async function editUserDeviceTitle(
        userDeviceId,
        title
    ){
        const response = await dataAccess.dataApi.editUserDeviceTitle(
            userDeviceId,
            title
        )
        return response;        
    }
}
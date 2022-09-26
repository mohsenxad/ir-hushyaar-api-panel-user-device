module.exports =  function buildGetUserDeviceByDeviceAndUser(
    APPID,
    fetch,
    createGetAllUserDeviceByDeviceAndUserRequest,
    translateGetUserDeviceByDeviceAndUserResponse
){
    return async function getUserDeviceByDeviceAndUser(
        deviceId,
        userId
    ){
        const options = createGetAllUserDeviceByDeviceAndUserRequest(
            deviceId,
            userId
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`,
            options
        );

        const response = await request.json();
        console.log(response);
        const userDevice = translateGetUserDeviceByDeviceAndUserResponse(response)
        return userDevice;
    }
}
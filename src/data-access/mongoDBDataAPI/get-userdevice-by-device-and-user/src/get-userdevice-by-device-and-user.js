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

        const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`;

        const request = await fetch(
            url,
            options
        );

        const response = await request.json();
        const userDevice = translateGetUserDeviceByDeviceAndUserResponse(response)
        return userDevice;
    }
}
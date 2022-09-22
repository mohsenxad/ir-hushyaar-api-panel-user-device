module.exports =  function buildGetAllUserDeviceByDeviceAndUser(APPID,fetch,createGetAllUserDeviceByDeviceAndUserRequest){
    return async function getAllUserDeviceByDeviceAndUser(
        deviceId,
        userId
    ){
        const options = createGetAllUserDeviceByDeviceAndUserRequest(
            deviceId,
            userId
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`,
            options
        );

        let response = await request.json();
        return response;
    }
}
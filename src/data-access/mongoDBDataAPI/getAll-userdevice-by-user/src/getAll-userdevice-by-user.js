module.exports =  function buildGetAllUserDeviceByUser(
    APPID,
    fetch,
    createGetAllUserDeviceByUserRequest,
    translateGetAllUserDeviceByUserResponse
){
    return async function getAllUserDeviceByUser(
        userId
    ){
        const options = createGetAllUserDeviceByUserRequest(
            userId
        );

        const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`;

        const request = await fetch(
            url,
            options
        );

        const response = await request.json();
        const userDeviceList = translateGetAllUserDeviceByUserResponse(response);

        return userDeviceList;
    }
}
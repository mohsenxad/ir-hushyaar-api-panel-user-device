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

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`,
            options
        );

        const response = await request.json();
        const userDeviceList = translateGetAllUserDeviceByUserResponse(response);

        return userDeviceList;
    }
}
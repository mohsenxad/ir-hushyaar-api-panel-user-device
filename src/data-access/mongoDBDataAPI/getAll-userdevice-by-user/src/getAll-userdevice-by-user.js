module.exports =  function buildGetAllUserDeviceByUser(APPID,fetch,createGetAllUserDeviceByUserRequest){
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

        let response = await request.json();
        return response;
    }
}
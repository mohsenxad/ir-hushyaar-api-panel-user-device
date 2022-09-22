module.exports =  function buildDeleteUserDevice(APPID,fetch,createDeleteUserDeviceRequest){
    return async function deleteUserDevice(
        userDeviceId
    ){
        const options = createDeleteUserDeviceRequest(
            userDeviceId
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/deleteOne`,
            options
        );

        let response = await request.json();
        return response;
    }
}
module.exports =  function buildDeleteUserDevice(APPID,fetch,createDeleteUserDeviceRequest){
    return async function deleteUserDevice(
        userDeviceId
    ){
        const options = createDeleteUserDeviceRequest(
            userDeviceId
        );

        const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/deleteOne`;

        const request = await fetch(
            url,
            options
        );

        const response = await request.json();
        console.log(response.deletedCount);
        return response;
    }
}
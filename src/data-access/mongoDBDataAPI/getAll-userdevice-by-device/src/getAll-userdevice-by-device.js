module.exports =  function buildGetAllUserDeviceByDevice(APPID,fetch,createGetAllUserDeviceByDeviceRequest){
    return async function getAllUserDeviceByDevice(
        deviceId
    ){
        const options = createGetAllUserDeviceByDeviceRequest(
            deviceId
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`,
            options
        );

        let response = await request.json();
        return response;
    }
}
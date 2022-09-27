module.exports =  function buildGetAllUserDeviceByDevice(
    APPID,
    fetch,
    createGetAllUserDeviceByDeviceRequest,
    translateGetAllUserDeviceByDeviceResponse
){
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

        const response = await request.json();
        const userDeviceList = translateGetAllUserDeviceByDeviceResponse(response);
        return userDeviceList;
    }
}
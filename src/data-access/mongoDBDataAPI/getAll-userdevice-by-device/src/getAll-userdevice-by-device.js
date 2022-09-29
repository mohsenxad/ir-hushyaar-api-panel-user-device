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

        const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/aggregate`;

        const request = await fetch(
            url,
            options
        );

        const response = await request.json();
        const userDeviceList = translateGetAllUserDeviceByDeviceResponse(response);
        return userDeviceList;
    }
}
module.exports =  function buildEditUserDeviceTitle(APPID,fetch,createEditUserDeviceTitleRequest){
    return async function editUserDeviceTitle(
        userDeviceId,
        title
    ){
        const options = createEditUserDeviceTitleRequest(
            userDeviceId,
            title
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/updateOne`,
            options
        );

        let response = await request.json();
        return response;
    }
}
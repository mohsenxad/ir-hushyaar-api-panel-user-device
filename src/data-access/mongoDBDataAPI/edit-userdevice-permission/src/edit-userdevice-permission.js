module.exports =  function buildEditUserDevicePermission(APPID,fetch,createEditUserDevicePermissionRequest){
    return async function editUserDevicePermission(
        userDeviceId,
        isAdmin,
        isMonitor,
        isArchiver
    ){
        const options = createEditUserDevicePermissionRequest(
            userDeviceId,
            isAdmin,
            isMonitor,
            isArchiver
        );

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/updateOne`,
            options
        );

        let response = await request.json();
        return response;
    }
}
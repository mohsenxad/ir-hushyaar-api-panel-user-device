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

        const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/updateOne`;

        const request = await fetch(
            url,
            options
        );

        const response = await request.json();
        return response;
    }
}
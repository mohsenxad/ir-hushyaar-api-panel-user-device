module.exports =  function buildEditUserDeviceTitle(
    APPID,
    fetch,
    createEditUserDeviceTitleRequest
)
    {
        return async function editUserDeviceTitle(
            userDeviceId,
            title
        )
            {
                const options = createEditUserDeviceTitleRequest(
                    userDeviceId,
                    title
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
module.exports =  function buildAddUserDevice(
    APPID,
    fetch,
    createAddUserDeviceRequest,
    translateAddUserDeviceResponse
)
    {
        return async function addUserDevice(
            userDevice
        )
            {
                const options = createAddUserDeviceRequest(userDevice);

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/insertOne`;
                
                const request = await fetch(
                    url,
                    options
                );

                const response = await request.json();

                const userDeviceId = translateAddUserDeviceResponse(response);
                return userDeviceId;
            }
    }
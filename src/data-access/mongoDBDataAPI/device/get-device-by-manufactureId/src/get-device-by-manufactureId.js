module.exports = function buildGetDeviceByManufactureId
(
    APPID,
    fetch,
    createGetDeviceByManufactureIdRequest,
    translateGetDeviceByManufactureIdResponse
)
    {
        return async function getDeviceByManufactureId
        (
            manufactureId
        )
            {
                const options = createGetDeviceByManufactureIdRequest(
                    manufactureId
                );
        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const user = translateGetDeviceByManufactureIdResponse(response);

                return user;
            }
    }
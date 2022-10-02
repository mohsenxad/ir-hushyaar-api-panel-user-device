module.exports = function buildGetUserByMobileNumber(
    APPID,
    fetch,
    createGetUserByMobileNumberRequest,
    translateGetUserByMobileNumberResponse
)
    {
        return async function getUserByMobileNumber(
            mobileNumber
        )
            {
                const options = createGetUserByMobileNumberRequest(
                    mobileNumber
                );
        
                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/findOne`;
                
                const request = await fetch(
                    url,
                    options
                );
        
                const response = await request.json();

                const user = translateGetUserByMobileNumberResponse(response);

                return user;
            }
    }
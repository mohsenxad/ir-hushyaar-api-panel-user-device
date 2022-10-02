module.exports = function buildAddUser(
    APPID,
    fetch,
    createAddUserRequest,
    translateAddUserResponse
)
    {
        return async function addUser(
            user
        )
            {
                const options = createAddUserRequest(user);

                const url = `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/insertOne`;

                const request = await fetch(
                    url,
                    options
                );

                const response = await request.json();
                const userId = translateAddUserResponse(response);
                return userId;
            }
    }
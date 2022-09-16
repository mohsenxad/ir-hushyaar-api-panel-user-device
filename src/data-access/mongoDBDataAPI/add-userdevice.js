var axios = require('axios');
var fetch = require('node-fetch');

module.exports =  function buildAddUserDevice(APPID,createAddUserDeviceRequest){
    return async function addUserDevice(
        userDevice
    ){
        const options = createAddUserDeviceRequest(userDevice);

        let request = await fetch(
            `https://data.mongodb-api.com/app/${APPID}/endpoint/data/v1/action/insertOne`,
            options
        );

        let response = await request.json();
        return response;
    }
}
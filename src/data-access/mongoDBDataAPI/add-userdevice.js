var axios = require('axios');
export default function buildAddUserDevice(apikey){
    return async function addUserDevice(
        userDevice
    ){
        
        var data = JSON.stringify({
            "collection": "userdevices",
            "database": "homeSecurity",
            "dataSource": "Cluster0",
            "projection": {
                "_id": 1
            }
        });
                    
        var config = {
            method: 'post',
            url: 'https://data.mongodb-api.com/app/data-bxinz/endpoint/data/beta/action/findOne',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apikey
            },
            data: data
        };
                    
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        
    }
}
module.exports = function buildCreateAddUserRequest(
    apikey,
    proxyAgent
)
    {
        return function createAddUserRequest(
            user
        ){
            var options= {
                method:"POST",
                headers:
                    {
                        "api-key": apikey,
                        "content-type":"application/json"
                    },
                body: JSON.stringify(
                    {
                        collection:"users",
                        database:"homeSecurity",
                        dataSource:"Cluster0",
                        document: user.toBson()
                    }
                )
            };
    
    
            if(proxyAgent){
                options.agent = proxyAgent;
            }
    
            return options;
        }
    }
module.exports = function buildCreateGetUserByMobileNumberRequest(
    apikey,
    proxyAgent
)
    {
        return function createGetUserByMobileNumberRequest(
            mobileNumber
        )
            {
                const query = {
                    "mobileNumber": mobileNumber 
                };
        
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
                            filter: query
                        }
                    )
                };
        
                if(proxyAgent){
                    options.agent = proxyAgent;
                }
        
        
                return options;
            }
    }
module.exports = function buildCreateGetDeviceByManufactureIdRequest
(
    apikey,
    proxyAgent
)
    {
        return function createGetDeviceByManufactureIdRequest
        (
            manufactureId
        )
            {
                const query = {
                    "manufactureId": manufactureId 
                };

                const headers = {
                    "api-key": apikey,
                    "content-type":"application/json"
                };

                const body = JSON.stringify(
                    {
                        collection:"devices",
                        database:"homeSecurity",
                        dataSource:"Cluster0",
                        filter: query
                    }
                );
        
                var options= {
                    method:"POST",
                    headers: headers,
                    body: body
                };
        
                if(proxyAgent){
                    options.agent = proxyAgent;
                }
        
        
                return options;
            }
    }
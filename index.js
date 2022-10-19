const auth = require('ir-hushyaar-middleware-panel-auth')(
    MONGODB_DATAAPI_APPID,
    MONGODB_DATAAPI_APIKEY,
    PROXY_URL
);

const authorization = require('ir-hushyaar-middleware-panel-authorization')(
    {
        MONGODB_DATAAPI_APPID:MONGODB_DATAAPI_APPID,
        MONGODB_DATAAPI_APIKEY:MONGODB_DATAAPI_APIKEY,
    },
    PROXY_URL,
    {
        UPSTASH_REDIS_REST_TOKEN: UPSTASH_REDIS_REST_TOKEN,
        UPSTASH_REDIS_REST_URL: UPSTASH_REDIS_REST_URL
    }

)

const packageJson = require('./package.json');
const userDeviceServices = require('./src');

import { Router } from 'itty-router'

const router = new Router();

router.get("/isAlive", async (req, event) => 
    {
        const result = {
            imoji: '👌',
            name : packageJson.name,
            version : packageJson.version
        };
        return createResponse(result);
    }
);


router.get('/userDevice/getAllByUser',
    auth.chechAuth,
    async (req, event) => 
        {
            try
                {
                    const userId = req.user;
                    const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(
                        userId
                    );
                    var result = {
                        deviceList: userDeviceList
                    };
                    return createResponse(result);
                }
            catch (error)
                {
                    return createErrorResponse(error);
                }
        }
)


router.get('/userDevice/getByUserAndDevice',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, event) => 
    {
        try
            {
                const userId = req.user;
                const deviceId = req.headers.get('deviceid');
                const userDevice = await userDeviceServices.getAllUserDeviceByDeviceAndUser(
                    deviceId,
                    userId
                );
                const result = {
                    device: userDevice
                };
                return createResponse(result);
            }
        catch (error)
            {
                return createErrorResponse(error);
            }
    }
)


router.get('/userDevice/getByDevice',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, event) =>
        {
            try
                {
                    const deviceId = req.headers.get('deviceid');
                    const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(
                        deviceId
                    );
                    const result = {
                        subscriberList: userDeviceList
                    };
                    return createResponse(result);
                }
            catch (error)
                {
                    return createErrorResponse(error);
                }
        }
)


router.post('/userDevice/remove',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, event) =>
        {
            try
                {
                    const deviceId = req.headers.get('deviceid');
					const body = await req.json();
                    const userDeviceId = body.userDeviceId;
                    const deleteResult = await userDeviceServices.deleteUserDevice(userDeviceId);
                    const result = {
                        result: deleteResult
                    };
                    return createResponse(result);
                } 
            catch (error) 
                {
                    return createErrorResponse(error);
                }
        }
)


router.post('/userDevice/add',
	auth.chechAuth,
	authorization.checkUserDeviceAccess,
	async (req, event) =>
		{
			try
				{
					const deviceId = req.headers.get('deviceid');
					const body = await req.json();
					const userDeviceInfo = body;
					const addResult = await userDeviceServices.addUserDevice(
						req.user,
						deviceId,
						userDeviceInfo
					);

					const result = 
						{
							result: addResult
						};
                    return createResponse(result);
				}
			catch (error)
				{
					return createErrorResponse(error);
				}
		}
)

router.post('/device/setup',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {
                    var userId = req.user;
                    const body = await req.json();
                    const manufactureId = body.manufactureId;
        
                    const addedUserDeviceId = await userDeviceServices.setup(
                        userId,
                        manufactureId
                    );
                    const result =
                        {
                            userDeviceId: addedUserDeviceId
                        };
        
                    return createResponse(result);
                }
            catch(error)
                {
                    return createErrorResponse(error);
                }
        }
)

//check for authorization with userDeviceId
router.post('/device/setInfo',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {

                    const body = await req.json();
                    const userdeviceId = body.userdeviceId;
                    const title = body.title;
        
                    const updatedUserDeviceResule = await userDeviceServices.editUserDeviceTitle(
                        userdeviceId,
                        title
                    );

                    const result =
                        {
                            result: updatedUserDeviceResule
                        };
        
                    return createResponse(result);
                }
            catch(error)
                {
                    return createErrorResponse(error);
                }
        }
)

function createErrorResponse(error){
    console.log(error);

    const jsonError = {
        message: error.message 
    }

    const init = {
        headers: { 
            'content-type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        },
        status: 400
    }

    return new Response(JSON.stringify(jsonError, null, 2), init);
}

function createResponse(jsonResult){
    const init = {
        headers: { 
            'content-type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        },
    }

    return new Response(JSON.stringify(jsonResult, null, 2), init);
}

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	'Access-Control-Max-Age': '86400',
	"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, token, deviceid"
};
  
function handleOptions(request)
{
	let headers = request.headers;
	if (
		headers.get('Origin') !== null &&
		headers.get('Access-Control-Request-Method') !== null &&
		headers.get('Access-Control-Request-Headers') !== null
	)
		{
			let respHeaders = {
				...corsHeaders,
				// Allow all future content Request headers to go back to browser
				// such as Authorization (Bearer) or X-Client-Name-Version
				'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
			};

			return new Response(null, 
				{
					headers: respHeaders,
				}
			);
		}
	else
		{
			return new Response(null,
				{
					headers: {
						Allow: 'GET, HEAD, POST, OPTIONS',
					},
				}
			);
		}
}


router.all('*', () => new Response('Not Found.', { status: 404 }))


addEventListener('fetch', event =>
	{
		
		if(event.request.method === 'OPTIONS')
			{
				event.respondWith(handleOptions(event.request));
			}
		else
			{
				const request = event.request;
				const body = request.body;
				const url = event.request.url;
				const modifiedRequest = new Request(url, 
					{
						body: request.body,
						headers: request.headers,
						method: request.method,
						redirect: request.redirect
					}
				)
				event.respondWith(router.handle(modifiedRequest, event))
			}
	}
)
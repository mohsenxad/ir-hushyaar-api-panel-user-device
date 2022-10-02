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

router.get("/", async (req, event) => 
    {
        return new Response(`👌 ${packageJson.name}:${packageJson.version}`)
    }
);


router.get('/userDevice/getAllByUser',auth.chechAuth,async (req, event) => 
    {
            console.time();
            try {
                const userId = req.user;
                const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(userId);
                const init = {
                    headers: { 
                        'content-type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*"
                    },
                }
                var result = {deviceList: userDeviceList};
                console.timeEnd();
                return new Response(JSON.stringify(result, null, 2), init);
            } catch (error) {
                console.log(error);
                return res
                    .setHeader('Access-Control-Allow-Origin','*')
                    .statusCode(400)
                    .json({
                        error: error
                    });
            }
    }
)


router.get('/userDevice/getByUserAndDevice',auth.chechAuth, authorization.checkUserDeviceAccess ,async (req, event) => 
    {
        console.time();
        try {
            const userId = req.user;
            const deviceId = req.headers.get('deviceid');
            const userDevice = await userDeviceServices.getAllUserDeviceByDeviceAndUser(deviceId,userId);
            const init = {
                headers: { 
                    'content-type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                },
            }
            var result = {device: userDevice};
            console.timeEnd();
            return new Response(JSON.stringify(result, null, 2), init);
        } catch (error) {
            console.log(error);
            res.json(
                {
                    error: error
                }
            )
        }
    }
)

router.get('/userDevice/getByDevice',auth.chechAuth, authorization.checkUserDeviceAccess ,async (req, event) =>
    {
        try {
            const deviceId = req.headers.get('deviceid');
            const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(deviceId);
            const init = {
                headers: { 
                    'content-type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*"
                },
            }
            var result = {subscriberList: userDeviceList};
            return new Response(JSON.stringify(result, null, 2), init);
        } catch (error) {
            console.log(error);
            res.json(
                {
                    error: error
                }
            )
        }
    }
)

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, token, deviceid"
  };
  
function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    let headers = request.headers;
    if (
      headers.get('Origin') !== null &&
      headers.get('Access-Control-Request-Method') !== null &&
      headers.get('Access-Control-Request-Headers') !== null
    ) {
      // Handle CORS pre-flight request.
      // If you want to check or reject the requested method + headers
      // you can do that here.
      let respHeaders = {
        ...corsHeaders,
        // Allow all future content Request headers to go back to browser
        // such as Authorization (Bearer) or X-Client-Name-Version
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
      };
  
      return new Response(null, {
        headers: respHeaders,
      });
    } else {
      // Handle standard OPTIONS request.
      // If you want to allow other HTTP Methods, you can do that here.
      return new Response(null, {
        headers: {
          Allow: 'GET, HEAD, POST, OPTIONS',
        },
      });
    }
  }



// {
//     try {
//         const deviceId = req.headers.deviceid;
//         const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(deviceId);
//         res.json(
//             {
//                 subscriberList: userDeviceList
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         res.json(
//             {
//                 error: error
//             }
//         )
//     }
    
// }
// )




// app.get('/userDevice/getByDevice', auth.chechAuth, authorization.checkUserDeviceAccess, async (req, res) =>
//     {
//         try {
//             const deviceId = req.headers.deviceid;
//             const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(deviceId);
//             res.json(
//                 {
//                     subscriberList: userDeviceList
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//             res.json(
//                 {
//                     error: error
//                 }
//             )
//         }
        
//     }
// )

// app.post('/userDevice/remove', auth.chechAuth, authorization.checkUserDeviceAccess,async (req, res) =>
//     {
//         try {
//             const deviceId = req.headers.deviceid;
//             const userDeviceId = req.body.userDeviceId;
//             const deleteResult = await userDeviceServices.deleteUserDevice(userDeviceId);
//             res.json(
//                 {
//                     result: deleteResult
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//             res.json(
//                 {
//                     error: error
//                 }
//             )
//         }
//     }
// )

// app.post('/userDevice/add', auth.chechAuth, authorization.checkUserDeviceAccess,async (req, res) =>
//     {
//         try {
//             const deviceId = req.headers.deviceid;
//             const userDeviceInfo = req.body;
//             console.log(userDeviceInfo);
//             const addResult = await userDeviceServices.addUserDevice(
//                 req.user,
//                 deviceId,
//                 userDeviceInfo
//             );
//             res.json(
//                 {
//                     result: addResult
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//             res.json(
//                 {
//                     error: error
//                 }
//             )
//         }
//     }
// )



router.all('*', () => new Response('Not Found.', { status: 404 }))


// attach the router "handle" to the event handler
addEventListener('fetch', event =>
    {
        
        if(event.request.method === 'OPTIONS'){
            event.respondWith(handleOptions(event.request));
        }else{
            const request = event.request
            const url = event.request.url;
            const modifiedRequest = new Request(url, {
                body: request.body,
                headers: request.headers,
                method: request.method,
                redirect: request.redirect
            })
            event.respondWith(router.handle(modifiedRequest, event))
        }
    }
)

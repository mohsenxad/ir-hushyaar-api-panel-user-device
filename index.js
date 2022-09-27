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
            // console.log('here');
            // const headers = event.request.headers;
            // console.log(headers);
            // console.log('deviceid')
            // console.log(req.headers.get('deviceid'));
            // req.headers.set("foo","bar");
            // console.log('foo')
            // console.log(req.headers.get('foo'));
            // req.user = 'asdfsad';
            console.log('user')
            console.log(req.user);

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
        console.log('accessList')
        console.log(req.accessList);
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



// addEventListener("fetch", event => {
//     if(event.request.method === 'OPTIONS'){
//         event.respondWith(handleOptions(event.request));
//     }else{
//         return event.respondWith(
//             router.serveRequest(event.request, {/* extra data */ })
//                 .then(built => built.response)
//         );
//     }
    
// });

// 404 for everything else
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
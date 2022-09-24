const auth = require('ir-hushyaar-middleware-panel-auth')(
  MONGODB_DATAAPI_APPID,
  MONGODB_DATAAPI_APIKEY,
  PROXY_URL
);

const packageJson = require('./package.json');
const userDeviceServices = require('./src');

import { Router } from "cloudflare-router";

const router = new Router();

router.get("/", (req, res) => {
    return res.text(`👌 ${packageJson.name}:${packageJson.version}`);
});

router.use("/userDevice/*",(req, res, next) => {
    res.locals.middlewareUsed = true;
    auth.chechAuth(req,res,next);
});

router.get('/userDevice/getAllByUser', async (req, res) => {
    try {
        const userId = req.user;
        const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(userId);
        return res
            .setHeader('Access-Control-Allow-Origin','*')
            .statusCode(200)
            .json({
                deviceList: userDeviceList
            });
    } catch (error) {
        console.log(error);
        return res
            .setHeader('Access-Control-Allow-Origin','*')
            .statusCode(400)
            .json({
                error: error
            });
    }
})

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
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

addEventListener("fetch", event => {
    if(event.request.method === 'OPTIONS'){
        event.respondWith(handleOptions(event.request));
    }else{
        return event.respondWith(
            router.serveRequest(event.request, {/* extra data */ })
                .then(built => built.response)
        );
    }
    
});
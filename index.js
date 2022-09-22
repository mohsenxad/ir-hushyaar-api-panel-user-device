// const auth = require('ir-hushyaar-middleware-panel-auth')(
//     'data-bxinz',
//     '4SHy2vABCZsYMqbk8tZL1YMAXfILgrQYOyt5T5gJ03YwVqN1zTwXRBQk8BshTy0p',
//     'http://localhost:1080'
// );

const packageJson = require('./package.json');

// var app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, locationId, deviceid, actuatorid, archiveid, sensorid, currentimageid ,imageid");
//     next();
//   });

// const userDeviceServices = require('./src');

// app.get('/', (req, res) => 
//     {
//         res.send(`👌 ${packageJson.name}:${packageJson.version}`);
//     }
// )

// app.get('/userDevice/getAllByUser',auth.chechAuth, async (req, res)=>
//     {
//         try {
//             const userId = req.user;
//             console.log(userId);
//             const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(userId);
//             res.json(
//                 {
//                     deviceList: userDeviceList
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


// app.listen(packageJson.port)

import { Router } from "cloudflare-router";


const router = new Router();
const api = new Router();

router.use("/api", api);

router.get("/", (req, res) => {
    return res.text(`👌 ${packageJson.name}:${packageJson.version}`);
});

router.get('/userDevice/getAllByUser',async (req, res) => {
    try {
        const userId = '5f6082724bf8de1c5c03e4ca';//req.user;
        console.log(userId);
        const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(userId);
        console.log(userDeviceList);
        return res
            .statusCode(200)
            .json({
                deviceList: userDeviceList
            });
    } catch (error) {
        console.log(error);
        return res
            .statusCode(400)
            .json({
                error: error
            });
    }
})

addEventListener("fetch", event => {
    return event.respondWith(
        router.serveRequest(event.request, {/* extra data */ })
            .then(built => built.response)
    );
});
const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();

const auth = require('ir-hushyaar-middleware-panel-auth')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL
);

const authorization = require('ir-hushyaar-middleware-panel-authorization')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL,
    process.env.REDIS_URL
)

const packageJson = require('./package.json');

var app = express();
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, deviceid");
    next();
  });

const userDeviceServices = require('./src');

app.get('/', (req, res) => 
    {
        res.send(`👌 ${packageJson.name}:${packageJson.version}`);
    }
)

app.get('/userDevice/getAllByUser',auth.chechAuth, async (req, res)=>
    {
        try {
            const userId = req.user;
            console.log(userId);
            const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(userId);
            res.json(
                {
                    deviceList: userDeviceList
                }
            );
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

app.get('/userDevice/getByUserAndDevice', auth.chechAuth, authorization.checkUserDeviceAccess, async (req, res) =>
{
    try {
        const userId = req.user;
        const deviceId = req.headers.deviceid;
        const userDevice = await userDeviceServices.getAllUserDeviceByDeviceAndUser(deviceId,userId);
        res.json(
            {
                device: userDevice
            }
        );
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

app.get('/userDevice/getByDevice', auth.chechAuth, authorization.checkUserDeviceAccess, async (req, res) =>
    {
        try {
            const deviceId = req.headers.deviceid;
            const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(deviceId);
            res.json(
                {
                    subscriberList: userDeviceList
                }
            );
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

app.post('/userDevice/remove', auth.chechAuth, authorization.checkUserDeviceAccess,async (req, res) =>
    {
        try {
            const deviceId = req.headers.deviceid;
            const userDeviceId = req.body.userDeviceId;
            const deleteResult = await userDeviceServices.deleteUserDevice(userDeviceId);
            res.json(
                {
                    result: deleteResult
                }
            );
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

app.post('/userDevice/add', auth.chechAuth, authorization.checkUserDeviceAccess,async (req, res) =>
    {
        try {
            const deviceId = req.headers.deviceid;
            const userDeviceInfo = req.body;
            console.log(userDeviceInfo);
            const addResult = await userDeviceServices.addUserDevice(
                req.user,
                deviceId,
                userDeviceInfo
            );
            res.json(
                {
                    result: addResult
                }
            );
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



app.listen(packageJson.port)
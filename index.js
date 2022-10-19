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

app.use(function(req, res, next)
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, deviceid");
        next();
    }
);

const userDeviceServices = require('./src');

app.get('/', (req, res) => 
    {
        res.send(`👌 ${packageJson.name}:${packageJson.version}`);
    }
)

app.get('/userDevice/getAllByUser',
    auth.chechAuth,
    async (req, res)=>
        {
            try
                {
                    const userId = req.user;
                    const userDeviceList = await userDeviceServices.getAllUserDeviceByUser(
                        userId
                    );
                    const result = {
                            deviceList: userDeviceList
                    }
                    sendResult(res, result);
                }
            catch (error)
                {
                    processError(res, error);
                }
            
        }
)

app.get('/userDevice/getByUserAndDevice',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) =>
        {
            try
                {
                    const userId = req.user;
                    const deviceId = req.headers.deviceid;
                    const userDevice = await userDeviceServices.getAllUserDeviceByDeviceAndUser(
                        deviceId,
                        userId
                    );
                    const result = {
                            device: userDevice
                    };
                    
                    sendResult(res, result);
                }
            catch (error)
                {
                    processError(res, error);
                }
            
        }
)

app.get('/userDevice/getByDevice',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) =>
        {
            try
                {
                    const deviceId = req.headers.deviceid;
                    const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(
                        deviceId
                    );

                    const result = {
                        subscriberList: userDeviceList
                    };
                    sendResult(res, result);
                }
            catch (error) 
                {
                    processError(res, error);
                }
            
        }
)

app.post('/userDevice/remove',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) =>
        {
            try
                {
                    const deviceId = req.headers.deviceid;
                    const userDeviceId = req.body.userDeviceId;
                    const deleteResult = await userDeviceServices.deleteUserDevice(userDeviceId);
                    const result = {
                        result: deleteResult
                    };
                    sendResult(res, result);
                }
            catch (error) 
                {
                    processError(res, error);
                }
        }
)

app.post('/userDevice/add',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) =>
        {
            try
                {
                    const deviceId = req.headers.deviceid;
                    const userDeviceInfo = req.body;
                    
                    const addResult = await userDeviceServices.addUserDevice(
                        req.user,
                        deviceId,
                        userDeviceInfo
                    );

                    const result = {
                        result: addResult
                    };

                    sendResult(res, result);
                }
            catch (error)
                {
                    processError(res, error);
                }
        }
)

app.post('/device/setup',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {
                    var userId = req.user;
                    var manufactureId = req.body.manufactureId;
        
                    const addedUserDeviceId = await userDeviceServices.setup(
                        userId,
                        manufactureId
                    );
                    const result =
                        {
                            userDeviceId: addedUserDeviceId
                        };
                    
        
                    sendResult(res, result)
                }
            catch(error)
                {
                    processError(res, error);
                }
        }
)

//check for authorization with userDeviceId
app.post('/device/setInfo',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {

                    const body = req.body;
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
                    
        
                    sendResult(res, result)
                }
            catch(error)
                {
                    processError(res, error);
                }
        }
)

function sendResult
(
    res,
    data
)
    {
        res.json(data);
    }

function processError
(
    res,
    error
)
    {
        console.log(error);
        res.status(400).json(
            {
                message: error.message 
            }
        );
    }


app.listen(packageJson.port,function()
    {
        console.log('Init ' + packageJson.name + ' on ' + packageJson.port);
        console.log('Access URL : http://localhost:' + packageJson.port);
    }
);
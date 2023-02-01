const express = require('express');
var bodyParser = require('body-parser')
require('dotenv').config();


const packageJson = require('./package.json');

const auth = require('ir-hushyaar-middleware-panel-auth')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL
);

var app = express();
app.use(bodyParser.json())

app.use(function(req, res, next) 
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, deviceid");
        next();
    }
);


const authorization = require('ir-hushyaar-middleware-panel-authorization')(
    process.env.MONGODB_DATAAPI_APPID,
    process.env.MONGODB_DATAAPI_APIKEY,
    process.env.PROXY_URL,
    process.env.REDIS_URL
)

const userDeviceServices = require('./src');


app.get("/isAlive", async (req, res) => 
    {
        console.log('isAlive')
        const result = {
            imoji: '👌',
            name : packageJson.name,
            version : packageJson.version
        };
        return sendResult(res,result);
    }
);


app.get('/userDevice/getAllByUser',
    auth.chechAuth,
    async (req, res) => 
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
                    return sendResult(res,result);
                }
            catch (error)
                {
                    return processError(res,error);
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
                const deviceId = req.headers['deviceid'];
                const userDevice = await userDeviceServices.getAllUserDeviceByDeviceAndUser(
                    deviceId,
                    userId
                );
                const result = {
                    device: userDevice
                };
                return sendResult(res,result);
            }
        catch (error)
            {
                return processError(res,error);
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
                    const deviceId = req.headers['deviceid'];
                    const userDeviceList = await userDeviceServices.getAllUserDeviceByDevice(
                        deviceId
                    );
                    const result = {
                        subscriberList: userDeviceList
                    };
                    return sendResult(res,result);
                }
            catch (error)
                {
                    return processError(res,error);
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
                    const deviceId = req.headers['deviceid'];
					const body = await req.json();
                    const userDeviceId = body.userDeviceId;
                    const deleteResult = await userDeviceServices.deleteUserDevice(userDeviceId);
                    const result = {
                        result: deleteResult
                    };
                    return sendResult(res,result);
                } 
            catch (error) 
                {
                    return processError(res,error);
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
					const deviceId = req.headers['deviceid'];
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
                    return sendResult(res,result);
				}
			catch (error)
				{
					return processError(res,error);
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
        
                    return sendResult(res,result);
                }
            catch(error)
                {
                    return processError(res,error);
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
        
                    return sendResult(res,result);
                }
            catch(error)
                {
                    return processError(res,error);
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

function processError(
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
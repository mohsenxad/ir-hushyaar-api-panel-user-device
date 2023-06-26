const express = require('express');
var bodyParser = require('body-parser')
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
require('dotenv').config();


const packageJson = require('./package.json');

const auth = require('ir-hushyaar-middleware-panel-auth')(
    {
        MONGODB_URI: process.env.MONGODB_URI,
        DATABASE_NAME: process.env.DATABASE_NAME
    }
);

var app = express();

Sentry.init(
    {
        dsn: process.env.SENTRY_DSN,
        integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
        ],
    
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    }
);

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

app.use(bodyParser.json())

app.use(function(req, res, next) 
    {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, deviceid");
        next();
    }
);


const authorization = require('ir-hushyaar-middleware-panel-authorization')(
    process.env.REDIS_URL,
    {
        DATABASE_NAME: process.env.DATABASE_NAME,
        MONGODB_URI: process.env.MONGODB_URI
    }
    
)

const userDeviceServices = require('./src');


app.get("/isAlive", async (req, res) => 
    {
        const result = {
            imoji: '👌',
            name : packageJson.name,
            version : packageJson.version
        };

        return sendResult(
            res,
            result
        );
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

                    return sendResult(
                        res,
                        result
                    );
                }
            catch (error)
                {
                    return processError(
                        res,
                        error
                    );
                }
        }
);


app.get('/userDevice/getByUserAndDevice',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) => 
    {
        try
            {
                const userId = req.user;
                const deviceId = req.headers.deviceid;

                const userDevice = await userDeviceServices.getUserdeviceByDeviceAndUser(
                    deviceId,
                    userId
                );

                const result = {
                    device: userDevice
                };

                return sendResult(
                    res,
                    result
                );
            }
        catch (error)
            {
                return processError(
                    res,
                    error
                );
            }
    }
);


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

                    return sendResult(
                        res,
                        result
                    );
                }
            catch (error)
                {
                    return processError(
                        res,
                        error
                    );
                }
        }
);


app.post('/userDevice/remove',
    auth.chechAuth,
    authorization.checkUserDeviceAccess,
    async (req, res) =>
        {
            try
                {
                    const deviceId = req.headers.deviceid;
                    const userDeviceId = req.body.userDeviceId;

                    const deleteResult = await userDeviceServices.deleteUserDevice(
                        userDeviceId
                    );

                    const result = {
                        result: deleteResult
                    };

                    return sendResult(
                        res,
                        result
                    );
                } 
            catch (error) 
                {
                    return processError(
                        res,
                        error
                    );
                }
        }
);


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

					const result = 
						{
							result: addResult
						};
                    
                    return sendResult(
                        res,
                        result
                    );
				}
			catch (error)
				{
					return processError(
                        res,
                        error
                    );
				}
		}
);

app.post('/device/setup',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {
                    const userId = req.user;
                    const manufactureId = req.body.manufactureId;
        
                    const addedUserDeviceId = await userDeviceServices.setup(
                        userId,
                        manufactureId
                    );

                    const result =
                        {
                            userDeviceId: addedUserDeviceId
                        };
        
                    return sendResult(
                        res,
                        result
                    );
                }
            catch(error)
                {
                    return processError(
                        res,
                        error
                    );
                }
        }
);

//check for authorization with userDeviceId
app.post('/device/setInfo',
    auth.chechAuth,
    async (req, res) =>
        {
            try 
                {
                    const userdeviceId = req.body.userdeviceId;
                    const title = body.title;
        
                    const updatedUserDeviceResule = await userDeviceServices.editUserDeviceTitle(
                        userdeviceId,
                        title
                    );

                    const result =
                        {
                            result: updatedUserDeviceResule
                        };
        
                    return sendResult(
                        res,
                        result
                    );
                }
            catch(error)
                {
                    return processError(
                        res,
                        error
                    );
                }
        }
);



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
        Sentry.captureException(error);
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
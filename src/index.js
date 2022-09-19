const MONGODB_DATAAPI_APPID = 'fakeAppId'
const MONGODB_DATAAPI_APIKEY = 'fakeApiKey';
const proxyUrl = 'http://localhost:1080';

const userDeviceServices = require('./use-cases')(
    MONGODB_DATAAPI_APPID,
    MONGODB_DATAAPI_APIKEY,
    proxyUrl
);

async function run(){

    const deviceId = '626a5b41dfbde8d0228ea8b3';
    const userId = '5f6082724bf8de1c5c03e4ca';
    try {

        // let userDeviceList = await getAllUserDeviceByDevice(
        //     deviceId
        // )

        // console.log(userDeviceList);

        // let userDeviceListWithUser = await getAllUserDeviceByUser(
        //     userId
        // )
        // console.log(userDeviceListWithUser)

        let result = await userDeviceServices.addUserDevice(
            {
                device: {
                    _id: deviceId
                },
                user: {
                    _id : userId
                },
                title: 'محل زندگی',
                isOwner: false,
                isAdmin: false,
                isMonitor: false,
                isArchiver: false,
                
            }
        );
        console.log(result);
        

        
        let editResult = await userDeviceServices.editUserDevicePermission(
            result.insertedId,
            true,
            true,
            false
        );
        console.log(editResult);

        // const foundUserDeviceWithDeviceAndUser2 = await getAllUserDeviceByDeviceAndUser(
        //     deviceId,
        //     userId
        // ) 

        // console.log(foundUserDeviceWithDeviceAndUser2)


        let updatedTitleResult = await userDeviceServices.editUserDeviceTitle(
            result.insertedId,
            'این جدیده'
        )
        console.log(updatedTitleResult);

        // const foundUserDeviceWithDeviceAndUser3 = await getAllUserDeviceByDeviceAndUser(
        //     deviceId,
        //     userId
        // ) 

        // console.log(foundUserDeviceWithDeviceAndUser3)

        // let deleteResult = await deleteUserDevice(
        //     result.insertedId,
        // )
        // console.log(deleteResult);

    } catch (error) {
        console.error(error.message)
    }
    
}

run();
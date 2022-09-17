const buildAddUserDevice = require('./use-cases/add-userdevice');

const addUserDevice = buildAddUserDevice();

async function run(){
    try {
        let result = await addUserDevice(
            {
                device: {
                    _id: 'fakeDeviceId'
                },
                user: {
                    _id : 'fakeUserId'
                },
                title: 'محل زندگی',
                isOwner: false,
                isAdmin: false,
                isMonitor: false,
                isArchiver: false,
                
            }
        );
        console.log(result);    
    } catch (error) {
        console.error(error.message)
    }
    
}

run();
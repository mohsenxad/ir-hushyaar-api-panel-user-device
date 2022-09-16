// import addUserDevice from './use-cases/add-userdevice';
const buildAddUserDevice = require('./use-cases/add-userdevice');

const addUserDevice = buildAddUserDevice();

console.log(addUserDevice)

async function run(){
    try {
        let result = await addUserDevice(
            {
                device: '123',
                user: '123',
                title: 'old title',
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
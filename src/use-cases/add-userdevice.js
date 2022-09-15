import makeUserDevice from "../userdevice"

export default function buildAddUserDevice(){

    return async function addUserDevice(
        userDeviceInfo
    ){
        const userDevice = makeUserDevice(userDeviceInfo);
        
    }
}
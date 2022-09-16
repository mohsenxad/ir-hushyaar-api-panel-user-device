const buildAddUserDevice = require('./add-userdevice');
const buildCreateAddUserDeviceRequest = require('./create-add-userdevice-request');

const proxyUrl = 'http://localhost:1080';
const APPID = 'fakeAppId'
const APIKEY = 'fakeApiKey';

const createAddUserDeviceRequest = buildCreateAddUserDeviceRequest(APIKEY, proxyUrl);
const addUserDevice = buildAddUserDevice(APPID, createAddUserDeviceRequest);

module.exports  = Object.freeze(
    {
        addUserDevice,
    }
);
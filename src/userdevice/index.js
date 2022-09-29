const buildMakeUserDevice = require('./userdevice');
const buildMakeUser = require('./user');

const makeUserDevice = buildMakeUserDevice();
const makeUser = buildMakeUser();

module.exports = Object.freeze(
    {
        makeUserDevice,
        makeUser
    }
)
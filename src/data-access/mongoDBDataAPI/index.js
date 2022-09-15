import buildAddUserDevice from "./add-userdevice";

const APIKEY = 'FakeApiKey';
const mongoDBDataApiUrl = 'https://data.mongodb-api.com/app/data-bxinz/endpoint/data/beta';


const addUserDevice = buildAddUserDevice(APIKEY);

export default addUserDevice;
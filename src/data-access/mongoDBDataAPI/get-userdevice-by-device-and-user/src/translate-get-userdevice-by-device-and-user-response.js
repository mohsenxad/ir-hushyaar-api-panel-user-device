module.exports = function buildTranslateGetUserDeviceByDeviceAndUserResponse(){
    return function translateGetUserDeviceByDeviceAndUserResponse(response){
        return response.documents[0];
    }
}
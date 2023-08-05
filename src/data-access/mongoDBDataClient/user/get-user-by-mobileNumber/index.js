const buildTranslateGetUserByMobileNumberResponse = require('./src/translate-get-user-by-mobileNumber-response');
const buildCreateGetUserByMobileNumberOptions = require('./src/create-get-user-by-mobileNumber-options');
const buildGetUserByMobileNumber = require('./src/get-user-by-mobileNumber');

module.exports = function(
    {
        getDb
    }
)
    {
        
        const translateGetUserByMobileNumberResponse = buildTranslateGetUserByMobileNumberResponse();

        const createGetUserByMobileNumberOptions = buildCreateGetUserByMobileNumberOptions();

        const getUserByMobileNumber = buildGetUserByMobileNumber(
            {
                getDb: getDb,
                createOptions: createGetUserByMobileNumberOptions,
                translateResponse: translateGetUserByMobileNumberResponse
            }
        );

        return Object.freeze(
            {
                getUserByMobileNumber
            }
        )
    }
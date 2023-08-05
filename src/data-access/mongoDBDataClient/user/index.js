module.exports = function(
    {
        mongoDBDriver,
        getDb
    }
)
    {
        
        const { addUser } = require('./add-user')(
            {
                getDb: getDb
            }
        );

        const { getUserByMobileNumber } = require('./get-user-by-mobileNumber')(
            {
                getDb: getDb
            }
        );

        return Object.freeze(
            {
                addUser,
                getUserByMobileNumber
            }
        )
    }
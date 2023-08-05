module.exports = function(
    {
        mongoDBDriver,
        getDb
    }
)
    {
        
        const { getDeviceByManufactureId } = require('./get-device-by-manufaccureId')(
            {
                getDb: getDb
            }
        );


        return Object.freeze(
            {
                getDeviceByManufactureId
            }
        )
    }
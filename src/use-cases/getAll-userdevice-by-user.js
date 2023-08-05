module.exports = function buildGetAllUserDeviceByUser
(
    {
        getAllUserdeviceByUserDB
    }
)
    {
        if
        (
            !getAllUserdeviceByUserDB
        )
            {
                throw new Error("buildGetAllUserDeviceByUser must have an getAllUserdeviceByUserDB");
            }

        return async function getAllUserDeviceByUser
        (
            {
                userId
            }
        )
            {
                if
                (
                    !userId
                )
                    {
                        throw new Error("getAllUserDeviceByUser must have an userId");
                    }
                    
                const response = await getAllUserdeviceByUserDB(
                    {
                        userId: userId
                    }
                );
                
                return response;        
            }
    }
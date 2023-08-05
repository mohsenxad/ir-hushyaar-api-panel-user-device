module.exports = function buildEditUserDeviceTitle
(
    {
        editUserDeviceTitleDB
    }
)
    {

        if
        (
            !editUserDeviceTitleDB
        )
            {
                throw new Error("buildEditUserDeviceTitle must have an editUserDeviceTitleDB");
            }

        return async function editUserDeviceTitle
        (
            {
                editUserDeviceTitleInfo
            }
        )
            {
                if
                (
                    !editUserDeviceTitleInfo
                )
                    {
                        throw new Error("editUserDeviceTitle must have an editUserDeviceTitleInfo");
                    }
                else if
                (
                    !editUserDeviceTitleInfo.userDeviceId
                )
                    {
                        throw new Error("editUserDeviceTitle editUserDeviceTitleInfo must have an userDeviceId");
                    }
                else if
                (
                    !editUserDeviceTitleInfo.title
                )
                    {
                        throw new Error("editUserDeviceTitle editUserDeviceTitleInfo must have an title");
                    }

                    
                const response = await editUserDeviceTitleDB(
                    {
                        userDeviceId: editUserDeviceTitleInfo.userDeviceId,
                        title: editUserDeviceTitleInfo.title
                    }
                );
                
                return response;        
            }
    }
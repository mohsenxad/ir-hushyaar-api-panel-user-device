module.exports = function buildCreateEditUserdeviceTitleOpions
()
    {
        return function createEditUserdeviceTitleOpions
        (
            {
                userDeviceId,
                title
            }
        )
            {
                if
                (
                    !userDeviceId
                )
                    {
                        throw new Error("createEditUserdeviceTitleOpions must have an userDeviceId");
                    }

                if
                (
                    !title
                )
                    {
                        throw new Error("createEditUserdeviceTitleOpions must have an title");
                    }

                const userDeviceObjectId = mongoDBDriver.ObjectID(
                    userDeviceId
                );

                const filter = {
                    "_id": userDeviceObjectId
                };

                const update = {
                    "$set": {
                        title: title,
                    }
                };

                const options = {
                    filter: filter,
                    update : update
                };

                return options;
            }
    }
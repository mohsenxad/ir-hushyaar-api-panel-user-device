module.exports =  function buildMakeUserDevice(){
    return function makeUserDevice(
        {
            device,
            registerDate = Date.now(),
            user,
            title,
            isOwner,
            isAdmin,
            isMonitor,
            isArchiver
        }
    ){
        if (!device) {
            throw new Error('Userdevice must have an device.')
        }

        if (!user) {
            throw new Error('Userdevice must have an user.')
        }

        if (!title) {
            throw new Error('Userdevice must have an title.')
        }

        if (isOwner == undefined) {
            isOwner = false;
        }

        if (isAdmin == undefined) {
            throw new Error('Userdevice must have an isAdmin.')
        }

        if (isMonitor == undefined) {
            throw new Error('Userdevice must have an isMonitor.')
        }

        if (isArchiver == undefined) {
            throw new Error('Userdevice must have an isArchiver.')
        }

        return Object.freeze({
            getDevice: () => device,
            getRegisterDate: () => registerDate,
            getUser: ()=> user,
            getTitle: () => title,
            getIsOwner: () => isOwner,
            getIsAdmin: () => isAdmin,
            getIsMonitor: () => isMonitor,
            getIsArchiver: () => isArchiver,
            toBson: toBson,
        })

        function toBson(){
            return {
                device:{
                    "$oid": device,
                },
                user: {
                    "$oid": user,
                },
                title: title,
                isOwner: isOwner,
                isAdmin: isAdmin, 
                isMonitor: isMonitor, 
                isArchiver: isArchiver,
                registerDate : {
                    "$date": {
                       "$numberLong": registerDate.toString()
                    }
                }
            }
        }
    }
}
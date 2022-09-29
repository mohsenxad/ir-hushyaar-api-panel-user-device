module.exports = function buildMakeUser(){
    return function makeUser(
        {
            userTitle,
            mobileNumber,
            registerDate = Date.now(),
        }
    ){

        if (!userTitle) {
            throw new Error('user must have a title.')
        }

        if (!mobileNumber) {
            throw new Error('user must have a mobile Number.')
        }

        return Object.freeze(
            {
                getTitle: () => userTitle,
                getMobileNumber: () => mobileNumber,
                getRegisterDate: () => registerDate,
                toBson: toBson,
            }
        )

        function toBson(){
            return {
                title: userTitle,
                mobileNumber: mobileNumber,
                registerDate : {
                    "$date": {
                       "$numberLong": registerDate.toString()
                    }
                }
            }
        }
    }
}
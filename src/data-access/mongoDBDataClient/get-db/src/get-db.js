module.exports = function buildGetDb
(
    {
        MongoClient,
        MONGODB_URI,
        DATABASE_NAME
    }
)
    {
        if
        (
            !MongoClient
        )
            {
                throw new Error("buildGetDb Client must have an MongoClient");
            }

        if
        (
            !MONGODB_URI
        )
            {
                throw new Error("buildGetDb Client must have an MONGODB_URI");
            }

        if
        (
            !DATABASE_NAME
        )
            {
                throw new Error("buildGetDb Client must have an DATABASE_NAME");
            }

        var client;
        var db;

        return async function getDb
        ()
            {
                if
                (
                    db
                )
                    {
                        return db;
                    }
                else if
                (
                    !db
                )
                    {
                        try
                            {
                                client = await MongoClient.connect(
                                    MONGODB_URI
                                );

                                console.log(`Connected To ${DATABASE_NAME} DataBase`);

                                db = client.db(DATABASE_NAME);

                                return db;
                            }
                        catch
                        (
                            error
                        )
                            {
                                console.log(error);
                            }

                    }

            }
    }

var config = {
    //userName: 'foodwise2_admin@foodwise2.database.windows.net',
    //password: 'Syde322password',
    //server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    //options: {encrypt: true, database: 'AdventureWorks'}

    userName: 'foodwise2_admin@foodwise2',
    password: 'Syde322password',
    server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'foodwise2', rowCollectionOnDone: true, rowCollectionOnRequestCompletion: true}
};

module.exports = config;
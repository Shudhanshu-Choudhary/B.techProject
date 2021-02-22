// In this file you can configure migrate-mongo
const DB_USER='rohan';
const DB_PASS='rohan1234';
const DB_NAME='vikalp';
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.hswhn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const config = {
    mongodb: {
    // TODO Change (or review) the url to your MongoDB:
        url: DB_URL,

        // TODO Change this to your database name:
        databaseName: DB_NAME,

        options: {
            useNewUrlParser: true, // removes a deprecation warning when connecting
            useUnifiedTopology: true, // removes a deprecating warning when connecting
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: './src/db/migrations/',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog',

    // The file extension to create migrations and search for in migration dir
    migrationFileExtension: '.js'
};
console.log(config.migrationsDir);
// Return the config as a promise
module.exports = config;

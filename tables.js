var knex = require("knex")({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "Movies"
    },
    useNullAsDefault: true
});
module.exports = knex;

knex.schema.hasTable('movie').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('movie', (table) => {
            table.increments('id')
            table.string('movie_name')
            table.string('movie_year')
            table.string('movie_url')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
})
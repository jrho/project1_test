import { Pool, Client }  from 'pg'

// pools will use environment variables
// for connection information
export const connectionPool = new Pool({
    user: process.env['1808_MOVIE_DB_USERNAME'],
    host:'revature-1808.chxo2eqpgujl.us-east-1.rds.amazonaws.com',
    //host:process.env['1808_MY_DB_AWS'],
    database: 'postgres',
    //password: process.env['1808_MOVIE_DB_PASSWORD'],
    password:'wh9785213',
    //1808_MOVIE_DB_PASSWORD
    port: 5432,
})

const pg = require('pg');
//const Pool = pg.Pool;
let pool;


// const pool = new Pool({
//     database: 'weekend-to-do-app',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// });

if(process.env.DATABASE_URL){
    pool = new pg.Pool({
      connectionString: process.envDATABASE_URL,
      ssl: {
        rejectionUnauthorized: false
      }  
    });
} else{
    pool = new pg.Pool({
        database: 'weekend-to-do-app',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
    });
}


// not required but very useful for debugging
pool.on('connect', () => {
    console.log('PostgreSQL is connected! Shoutout Node!');
});

pool.on('error', (error) => {
    console.log('Error with PostgreSQL:', error);
});

module.exports = pool;
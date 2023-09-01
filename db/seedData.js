const client = require('./client');

async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS cats;
            DROP TABLES IF EXISTS users;
        `);
        console.log("Finished dropping tables!");
    } catch(error) {
        throw error;
    }
}

async function createTables() {
    try {
        console.log("Starting to build tables...");
        await client.query(`
            CREATE TABLE cats (
                id SERIAL PRIMARY KEY,
                name TEXT,
                age INTEGER,
                color TEXT,
                description TEXT,
                price DECIMAL(10,2)
            );
        `);
    } catch(error) {
        throw error;
    }
}
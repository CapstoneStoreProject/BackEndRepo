const client = require('./client');

//STRETCH GOAL: users can "favorite" cats to review the list 
//later when they are done going through all the cats they can
//look at the list of the ones they like the most and other users can see 
//how many people have favorited the cats which may give them incentive
//to act fast

//STRETCH GOAL 2: screening process for users who try to buy cats to make 
//sure they are going to a good home -- question form, compare users answers
//to acceptable answers to get a cat. If answers don't match up then you
//don't get a cat 

async function dropTables() {
    try {
        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS cats;
            DROP TABLE IF EXISTS users;
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
                name VARCHAR(50),
                "imgUrl" TEXT,
                age INTEGER,
                sex VARCHAR(6),
                color TEXT,
                description TEXT,
                price VARCHAR(4)
            );
        `);

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                active BOOLEAN DEFAULT true
            );
        `);

        console.log("Finished building tables!");
    } catch(error) {
        throw error;
    }
}

async function createInitialUsers() {
    console.log('Starting to create users...');
    try {
        const usersToCreate = [
            { name: "al", username: 'albert', password: 'burts99' },
            { name: "sally", username: 'sandra', password: 'sassy123' },
            { name: "felicia", username: 'glamgal', password: 'glamgal123' },
        ]
        const users = await Promise.all(usersToCreate.map(createUser));

        console.log('Finished creating users!');
    } catch (error) {
        console.error('Error creating users!');
        throw error;
    }
}

async function createCats() {
    try {
        console.log("Starting to create cats...");
        const catsToCreate = [
            { 
                name: "Socks", 
                imgUrl: "https://conservationcubclub.com/wp-content/uploads/2012/05/Iams-Delilah-May-12-cat.jpg",
                age: "5",
                sex: "male",
                color: "grey with black stripes and white socks",
                description: "Snuggly, loving cat. Socks enjoys long naps, chasing the laser pointer, and looking out the window.",
                price: "FREE"
            }
        ]
    } catch (error) {
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createCats();
     
    } catch (error) {
        throw error;
    }
}

// export rebuildDB function
module.exports = {
    rebuildDB
}
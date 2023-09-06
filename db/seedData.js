const client = require('./client');
const { createUser } = require('./models/user.js');
const { createCat } = require('./models/cat.js');

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
                imgurl TEXT,
                age VARCHAR(50),
                sex VARCHAR(6),
                color TEXT,
                description TEXT,
                breed TEXT,
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

async function createInitialCats() {
    try {
        console.log("Starting to create cats...");
        const catsToCreate = [
            { 
                name: "Socks", 
                imgurl: "https://conservationcubclub.com/wp-content/uploads/2012/05/Iams-Delilah-May-12-cat.jpg",
                age: "5 years",
                sex: "male",
                color: "grey with black stripes and white socks",
                description: "Snuggly, loving cat. Socks enjoys long naps, chasing the laser pointer, and looking out the window.",
                breed: "Domestic Shorthair",
                price: "FREE"
            },
            {
                name: "Black Star",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd19fjBzqN49AdndZBdZmWTYYAn9exVl5Qbg&usqp=CAU",
                age: "5 months",
                sex: "male",
                color: "Black with white star on chest",
                description: "Rambunctious, playful, and outgoing kitty excited to get his forever home. He plays well with other cats and will make a fine addition to any family.",
                breed: "Domestic Shorthair",
                price: "FREE"
            },
            {
                name: "Punch",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvIPwYoxrPiDl_PadvadWhBkFPa66HEO4BA&usqp=CAU",
                age: "1 year",
                sex: "Female",
                color: "Black and white tuxedo cat",
                description: "Punch is a one person cat. She doesn't like other animals or anyone other than the person she decides is her person. Do not take her if you have other pets or many people in the home. She is very affectionate to her one person.",
                breed: "Domestic Shorthair",
                price: "FREE"
            },
            {
                name: "Mia",
                imgurl: "",
                age: "2 years",
                sex: "Female",
                color: "Black",
                description: "",
                breed: "Domestic Longhair",
                price: "FREE"
            },
            {
                name: "Blue",
                imgurl: "",
                age: "8 months",
                sex: "Female",
                color: "Blue Grey",
                description: "",
                breed: "Russian Blue",
                price: "FREE"
            },
            // {
            //     name: ,
            //     imgurl: ,
            //     age: ,
            //     sex: ,
            //     color: ,
            //     description: ,
            //     breed: ,
            //     price: 
            // },
            // {
            //     name: ,
            //     imgurl: ,
            //     age: ,
            //     sex: ,
            //     color: ,
            //     description: ,
            //     breed: ,
            //     price: 
            // },
            // {
            //     name: ,
            //     imgurl: ,
            //     age: ,
            //     sex: ,
            //     color: ,
            //     description: ,
            //     breed: ,
            //     price: 
            // },
            // {
            //     name: ,
            //     imgurl: ,
            //     age: ,
            //     sex: ,
            //     color: ,
            //     description: ,
            //     breed: ,
            //     price: 
            // },
            // {
            //     name: ,
            //     imgurl: ,
            //     age: ,
            //     sex: ,
            //     color: ,
            //     description: ,
            //     breed: ,
            //     price: 
            // },
        ]
        const cats = await Promise.all(catsToCreate.map(createCat));
        console.log("Cats created")
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
        await createInitialCats();
     
    } catch (error) {
        throw error;
    }
}

// export rebuildDB function
module.exports = {
    rebuildDB
}
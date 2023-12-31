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
            DROP TABLE IF EXISTS cart;
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
                age FLOAT,
                sex VARCHAR(6),
                color TEXT,
                description TEXT,
                breed TEXT,
                neutered BOOLEAN DEFAULT false,
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
        // await client.query(`
        //     CREATE TABLE carts (
        //         cart_id SERIAL PRIMARY KEY,
        //         user_id INTEGER,
        //         FOREIGN KEY (user_id) REFERENCES users (user_id)
        //     );
        // `);

        // await client.query(`
        //     CREATE TABLE cart_items (
        //         cart_item_id SERIAL PRIMARY KEY,
        //         cart_id INTEGER,
        //         product_id INTEGER,
        //         quantity INTEGER,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         FOREIGN KEY (cart_id) REFERENCES carts (cart_id),
        //         FOREIGN KEY (product_id) REFERENCES products (product_id)
        //     );
        // `);

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
                age: 5,
                sex: "Male",
                color: "grey with black stripes and white socks",
                description: "Snuggly, loving cat. Socks enjoys long naps, chasing the laser pointer, and looking out the window.",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Black Star",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd19fjBzqN49AdndZBdZmWTYYAn9exVl5Qbg&usqp=CAU",
                age: .5,
                sex: "Male",
                color: "Black with white star on chest",
                description: "Rambunctious, playful, and outgoing kitty excited to get his forever home. He plays well with other cats and will make a fine addition to any family.",
                breed: "Domestic Shorthair",
                neutered: false,
                price: "FREE"
            },
            {
                name: "Punch",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvIPwYoxrPiDl_PadvadWhBkFPa66HEO4BA&usqp=CAU",
                age: 1,
                sex: "Female",
                color: "Black and white tuxedo cat",
                description: "Punch is a one person cat. She doesn't like other animals or anyone other than the person she decides is her person. Do not take her if you have other pets or many people in the home. She is very affectionate to her one person.",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Mia",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWCSSFPhMppxIDZg0vt0KYlSWfxldb0716vA&usqp=CAU",
                age: 2,
                sex: "Female",
                color: "Black",
                description: "Independent kitty, loves to play with anything other than her cat toys, like sponges, plastic cutlery, and balled up paper.",
                breed: "Domestic Longhair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Blue",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgozsTMLCseiIcwWaqMbqcTyz1IkJnppUwA&usqp=CAU",
                age: .8,
                sex: "Female",
                color: "Blue Grey",
                description: "Affectionate lap cat, loves to give people baths.",
                breed: "Russian Blue",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Latte",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGhdTzujd-uI8O2w-MhsuGQnkmBTzhKr0rw&usqp=CAU",
                age: .9,
                sex: "Female",
                color: "Beige with dark face, tail and legs",
                description: "Latte is a great hunter and loves to go outside.",
                breed: "Siamese",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Henry",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-PnEyHBukyRWYq4F3eXcSZ8ZyDBdfmuFcw&usqp=CAU",
                age: .5,
                sex: "Male",
                color: "Orange",
                description: "Henry is very outgoing and loves to be pet and look out the window.",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Aria",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dB6hfPt8rSfjXlR-jycT7vC2b23HvaSjYA&usqp=CAU",
                age: 1.7,
                sex: "Female",
                color: "white and grey",
                description: "Aria is a lap cat. If you sit down she will sit on your lap every time. She loves attention and playing with curly ribbons on a stick.",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Fluffy",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi7_OelIPg_0BPlR4gul5YVSw3JUXUofqxA&usqp=CAU",
                age: 2,
                sex: "Female",
                color: "White",
                description: "Independent cat who occassionally likes to be pet.",
                breed: "Persian",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Chloe",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtZELy1-f33iJjBnGMqdCTTIncg_ij1st_g&usqp=CAU",
                age: 3,
                sex: "Female",
                color: "Black and white",
                description: "Lap cat. Meows loudly when hungry.",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Dyson",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnAr5QEHPhT087IxDLL9fQw413qFbwXX3xQ&usqp=CAU",
                age: .4,
                sex: "Male",
                color: "Grey tuxedo",
                description: "Loving kitty, has trouble meowing.",
                breed: "Domestic Shorthair",
                neutered: false,
                price: "FREE"
            },
            {
                name: "Rory",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8kezKKKNF8h6bFeMYIPdnBX-KcynmpE636A&usqp=CAU",
                age: 1.5,
                sex: "Male",
                color: "Black and brown",
                description: "Rory is very big but he is also very gentle. He loves to play with the laser pointer.",
                breed: "Maine Coon",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Jinx",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4f953IWTgggNcIu1XwYxW6a4boZnJps6DBg&usqp=CAU",
                age: 4,
                sex: "Female",
                color: "Callico",
                description: "Jinx loves to carry stuffed animals around in her mouth and treat them like they're her kittens",
                breed: "Domestic Shorthair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Snowball",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPu3FBJUGhuws7TVNE5el1wHiSKnFU6Vv-Q&usqp=CAU",
                age: 3,
                sex: "Female",
                color: "White",
                description: "Playful and energetic, loves catnip.",
                breed: "Domestic Longhair",
                neutered: true,
                price: "FREE"
            },
            {
                name: "Greyson",
                imgurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXFWAQR4FxlJplpTmZYkXrhSdYlwvPMAq8xg&usqp=CAU",
                age: 2,
                sex: "Male",
                color: "Grey",
                description: "",
                breed: "Domestic Longhair",
                neutered: true,
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
            //     neutered: ,
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
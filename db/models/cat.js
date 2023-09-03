const client = require('../client');

async function createCat({ name, imgurl, age, sex, color, description, breed, price }) {
    try {
        const { rows: [cat] } = await client.query(`
        INSERT INTO cats(name, imgurl, age, sex, color, description, breed, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,[name, imgurl, age, sex, color, description, breed, price]);
        return cat;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createCat
    
  }
// id SERIAL PRIMARY KEY,
// name VARCHAR(50),
// "imgUrl" TEXT,
// age INTEGER,
// sex VARCHAR(6),
// color TEXT,
// description TEXT,
// price VARCHAR(4)
const client = require('../client');

async function getAllCats() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM cats;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function createCat({ name, imgurl, age, sex, color, description, breed, neutered, price }) {
    try {
        const { rows: [cat] } = await client.query(`
        INSERT INTO cats(name, imgurl, age, sex, color, description, breed, neutered, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `,[name, imgurl, age, sex, color, description, breed, neutered, price]);
        return cat;
    } catch (error) {
        throw error;
    }
}

async function getCatById(id) {
    try {
        const { rows: [cat] } = await client.query(`
        SELECT *
        FROM cats
        WHERE id = $1;
        `, [id]);
        return cat;
    } catch (error) {
        throw error;
    }
}

async function deleteCatById(id) {
    try {
        const { rows: [cat] } = await client.query(`
        DELETE FROM cats
        WHERE id=$1
        RETURNING *;
        `, [id]);
        return cat;
    } catch (error) {
        throw error;
    }
}
// async function deleteCheckedOutCats(cart) {
//     try {

//     } catch (error) {
//         throw error;
//     }
// }
async function deleteAllCats() {
    try {
        const { rows } = await client.query(`
        DELETE FROM cats;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCats,
    createCat,
    getCatById,
    deleteCatById,
    deleteAllCats
}

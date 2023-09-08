const express = require('express');
const router = express.Router();
const { getAllCats, getCatById, deleteCatById, deleteAllCats } = require('../db/models/cat.js');
const { requireUser } = require('./utils');


// GET /api/cats
router.get('/', async (req, res, next) => {
    try {
        const cats = await getAllCats();
        res.send(cats);
    } catch (error) {
        next(error);
    }
});

// GET /api/cats/:catId
router.get('/:catId', async (req, res, next) => {
    try {
        const cat = await getCatById(req.params.catId);
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

// // DELETE /api/cats/:catId
// router.delete('/:catId', requireUser, async (req, res, next) => {
//     try {
//         const cat = await deleteCatById(req.params.catId);
//         res.send(cat);
//     } catch (error) {
//         next(error);
//     }
// });

// // DELETE /api/cats
// router.delete('/', requireUser, async (req, res, next) => {
//     try {
//         const cats = await deleteAllCats();
//         res.send(cats);
//     } catch (error) {
//         next(error);
//     }
// });

// export router
module.exports = router;
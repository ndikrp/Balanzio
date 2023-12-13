const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');

router.get('/foods', (req, res) => {
    const selectFoodsSql = 'SELECT * FROM food';

    pool.query(selectFoodsSql, (error, results) => {
        if (error) {
            console.error('Error querying recipes:', error);
            return res.status(500).json({ error: 'Error querying foods' });
        }
        res.json({ status: 'Success', food: results });
    });
});

router.get('/foods/:category', (req, res) => {
    const category = req.params.category;
  
    const selectFoodsSql = 'SELECT * FROM food WHERE category = ?'; 
  
    pool.query(selectFoodsSql, [category], (error, results) => {
      if (error) {
        console.error('Error querying foods:', error);
        return res.status(500).json({ error: 'Error querying foods' });
      }
      res.json({ status: 'Success', food: results });
    });
  });

module.exports = router;

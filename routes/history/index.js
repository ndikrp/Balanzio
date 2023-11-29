const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');

router.get('/history', (req, res) => {
    const selectHistorySql = 'SELECT * FROM history';

    pool.query(selectHistorySql, (error, results) => {
        if (error) {
            console.error('Error querying history:', error);
            return res.status(500).json({ error: 'Error querying history' });
        }
        res.json({ status: 'Success', food: results });
    });
});

router.get('/history/:userId', (req, res) => {
    const userId = req.params.userId;

    const selectHistorySql = `
        SELECT h.*, f.name, f.protein, f.fat, f.carbo, f.water
        FROM history h
        JOIN food f ON h.foodId = f.foodId
        WHERE h.userId = ?
    `;
    
    pool.query(selectHistorySql, [userId], (error, results) => {
        if (error) {
            console.error('Error querying history:', error);
            return res.status(500).json({ error: 'Error querying history' });
        }
        res.json({ status: 'Success', history: results });
    });
});


module.exports = router;
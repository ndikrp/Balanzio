const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');
const sqlQueries = require('../../utils/sqlQueries.js');

router.get('/history', (req, res) => {
    const selectHistorySql = sqlQueries.selectAllHistory;

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

    const selectHistorySql = sqlQueries.selectUserHistory;
    
    pool.query(selectHistorySql, [userId], (error, results) => {
        if (error) {
            console.error('Error querying history:', error);
            return res.status(500).json({ error: 'Error querying history' });
        }
        res.json({ status: 'Success', history: results });
    });
});


module.exports = router;
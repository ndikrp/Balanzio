const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');
const sqlQueries = require('../../utils/sqlQueries.js');

router.post('/goals', (req, res) => {
    const { userId, caloriesGoal } = req.body;
  
    const insertGoalsSql = sqlQueries.insertGoals;
  
    pool.query(insertGoalsSql, [userId, caloriesGoal], (error, results) => {
      if (error) {
        console.error('Error inserting/updating goals:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.affectedRows > 0) {
          res.json({ status: 'Success', message: 'Goals inserted/updated successfully' });
        } else {
          console.log('No rows affected. Check if user and date exist.');
          return res.status(404).json({ error: 'User or date not found' });
        }
      }
    });
  });

router.get('/goals/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const fetchGoalsSql = sqlQueries.fetchDailyGoals

    console.log('Fetch Goals SQL Query:', fetchGoalsSql); 
    pool.query(fetchGoalsSql, [userId], (error, goalsResults) => {
      console.log('goalsResults:', goalsResults);
  
      if (!goalsResults.length || goalsResults[0].caloriesGoal === undefined) {
        console.log('No goals found for the user');
        return res.status(404).json({ error: 'Goals not found for the user' });
      } else {
        if (goalsResults[0].caloriesGoal === null) {
          console.log('Calories goal is null for the user');
          return res.status(404).json({ error: 'Calories goal not found for the user' });
        } else {
          const dailyIntakeSql = sqlQueries.dailyIntakeGoals
  
          console.log('Daily Intake SQL Query:', dailyIntakeSql); 
          pool.query(dailyIntakeSql, [userId], (error, dailyIntakeResults) => {
            console.log('dailyIntakeResults:', dailyIntakeResults);
  
            const dailySummary = {
              goals: { calories: goalsResults[0].caloriesGoal },
              intake: dailyIntakeResults[0],
            };
  
            res.json({ status: 'Success', dailySummary });
          });
        }
      }
    });
  });
  

module.exports = router;

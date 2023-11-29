const express = require('express');
const router = express.Router();
const pool = require('../../config/database.js');

//-----------------------------------/list--------------------------------//

router.get('/list', (req, res) => {
  const selectRecipesSql = 'SELECT * FROM recipes';

  pool.query(selectRecipesSql, (error, results) => {
    if (error) {
      console.error('Error querying recipes:', error);
      return res.status(500).json({ error: 'Error querying recipes' });
    }

    res.json({ status: 'Success', recipes: results });
  });
});

//-----------------------------------/recipe--------------------------------//

router.post('/recipe/:userId', (req, res) => {
  const userId = req.params.userId;
  const { recipe_id } = req.body;

  if (!recipe_id) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  const checkDuplicateQuery = 'SELECT * FROM favorites WHERE userId = ? AND recipe_id = ?';
  pool.query(checkDuplicateQuery, [userId, recipe_id], (duplicateErr, duplicateResults) => {
    if (duplicateErr) {
      console.error('Error checking for duplicate:', duplicateErr);
      return res.status(500).json({ error: 'Error checking for duplicate.' });
    }

    if (duplicateResults.length > 0) {
      return res.status(400).json({ error: 'Recipe is already a favorite for this user.' });
    }

    const getFoodNameQuery = 'SELECT name FROM recipes WHERE recipe_id = ?';

    pool.query(getFoodNameQuery, [recipe_id], (err, results) => {
      if (err) {
        console.error('Error retrieving name from recipes:', err);
        return res.status(500).json({ error: 'Error retrieving name from recipes.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      const food_name = results[0].name;

      const addFavoriteQuery = 'INSERT INTO favorites (userId, recipe_id, food_name, add_at) VALUES (?, ?, ?, CURDATE())';
      const values = [userId, recipe_id, food_name];

      pool.query(addFavoriteQuery, values, (addErr, result) => {
        if (addErr) {
          console.error('Error adding favorite recipe:', addErr);
          return res.status(500).json({ error: 'Error adding favorite recipe.' });
        }

        res.json({ status: 'Success', message: 'Favorite recipe added successfully', result });
      });
    });
  });
});

router.get('/recipe/favorites/:userId', (req, res) => {
  const userId = req.params.userId;

  const getFavoritesQuery = 'SELECT * FROM favorites WHERE userId = ?';

  pool.query(getFavoritesQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving favorites:', err);
      return res.status(500).json({ error: 'Error retrieving favorites.' });
    }

    res.json({ status: 'Success', favorites: results });
  });
});

router.delete('/recipe/unfavorite/:userId/:recipeId', (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  const unfavoriteQuery = 'DELETE FROM favorites WHERE userId = ? AND recipe_id = ?';

  pool.query(unfavoriteQuery, [userId, recipeId], (err, deleteResults) => {
    if (err) {
      console.error('Error unfavoriting recipe:', err);
      return res.status(500).json({ error: 'Error unfavoriting recipe.' });
    }

    const getRecipeNameQuery = 'SELECT name FROM recipes WHERE recipe_id = ?';

    pool.query(getRecipeNameQuery, [recipeId], (err, nameResults) => {
      if (err) {
        console.error('Error fetching recipe name:', err);
        return res.status(500).json({ error: 'Error fetching recipe name.' });
      }

      const unfavoritedRecipeName = nameResults[0] ? nameResults[0].name : null;

      res.json({
        status: 'Success',
        message: 'Recipe unfavorited successfully',
        unfavoritedRecipeName,
        deleteResults,
      });
    });
  });
});

module.exports = router;

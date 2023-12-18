module.exports = {
  //-----------------------------------user--------------------------------------//
  checkEmail: 'SELECT * FROM users WHERE email = ?',
  insertUser: 'INSERT INTO users (name, weight, height, gender, age, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
  getUserByEmail: 'SELECT * FROM users WHERE email = ?',
  selectUserSql: 'SELECT name, weight, height, gender, age, email, password FROM users WHERE userId = ?',
  updateUser: 'UPDATE users SET %s WHERE userId = ?',
  insertFood: 'INSERT INTO history (foodId, userId, date) VALUES (?, ?, NOW())',

//-----------------------------------recipes--------------------------------------//
  selectRecipes: 'SELECT * FROM recipes',
  checkDuplicate: 'SELECT * FROM favorites WHERE userId = ? AND recipe_id = ?',
  getFoodName: 'SELECT name FROM recipes WHERE recipe_id = ?',
  addFavorite: 'INSERT INTO favorites (userId, recipe_id, food_name, add_at) VALUES (?, ?, ?, CURDATE())',
  getFavorites: 'SELECT * FROM favorites WHERE userId = ?',
  unfavorite: 'DELETE FROM favorites WHERE userId = ? AND recipe_id = ?',
  getRecipeName: 'SELECT name FROM recipes WHERE recipe_id = ?',

//-----------------------------------history--------------------------------------//
  selectAllHistory: 'SELECT * FROM history',
  selectUserHistory: `SELECT h.*, f.name, f.protein, f.fat, f.carbo, f.water
                      FROM history h
                      JOIN food f ON h.foodId = f.foodId
                      WHERE h.userId = ?`,

//-----------------------------------food--------------------------------------//
  selectAllFoods: 'SELECT * FROM food',

//-----------------------------------goals--------------------------------------//
insertGoals: `INSERT INTO goals (userId, caloriesGoal, date)
                VALUES (?, ?, CURDATE())
                ON DUPLICATE KEY UPDATE caloriesGoal = VALUES(caloriesGoal);`,
  fetchDailyGoals: 'SELECT * FROM goals WHERE userId = ? AND date = CURDATE()',
  dailyIntakeGoals: `SELECT 
                     SUM(f.calorie) AS totalCalories, 
                     SUM(f.carbo) AS totalCarbo, 
                     SUM(f.fat) AS totalFat, 
                     SUM(f.water) AS totalWater
                     FROM history h
                     JOIN food f ON h.foodId = f.foodId
                     WHERE h.userId = ? AND DATE(h.date) = CURDATE();`,

};
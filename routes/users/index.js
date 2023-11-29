const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../../config/database.js');

//-----------------------------------/insert--------------------------------//

router.post('/register', (req, res) => {
  const userData = req.body;

  const requiredFields = ['name', 'weight', 'height', 'gender', 'age', 'email', 'password'];
  for (const field of requiredFields) {
    if (!userData[field]) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
  pool.query(checkEmailSql, [userData.email], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking email:', checkError);
      return res.status(500).json({ error: 'Error checking email' });
    }

    if (checkResults.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const saltRounds = 10;
    bcrypt.hash(userData.password, saltRounds, (hashError, hashedPassword) => {
      if (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      const insertUserSql = 'INSERT INTO users (name, weight, height, gender, age, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [
        userData.name,
        userData.weight,
        userData.height,
        userData.gender,
        userData.age,
        userData.email,
        hashedPassword,
      ];

      pool.query(insertUserSql, values, (insertError, results) => {
        if (insertError) {
          console.error('Error inserting user data:', insertError);
          return res.status(500).json({ error: 'Error inserting user data' });
        }

        console.log('Inserted rows:', results.affectedRows);
        res.json({ status: 'Success', message: 'User data inserted successfully', results });
      });
    });
  });
});

//-----------------------------------/login--------------------------------//

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error querying user:', error);
      return res.status(500).json({ error: 'Error querying user' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptError, passwordMatch) => {
      if (bcryptError) {
        console.error('Error comparing passwords:', bcryptError);
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ status: 'Success', message: 'Successfuly Login', token });
      console.log('Retrieved user:', user);
    });
  });
});

//-----------------------------------/user--------------------------------//

router.put('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, weight, height, gender, age, password } = req.body;

  const updateFields = [];
  const updateValues = [];

  if (name !== undefined) {
    updateFields.push('name = ?');
    updateValues.push(name);
  }

  if (weight !== undefined) {
    updateFields.push('weight = ?');
    updateValues.push(weight);
  }

  if (height !== undefined) {
    updateFields.push('height = ?');
    updateValues.push(height);
  }

  if (gender !== undefined) {
    updateFields.push('gender = ?');
    updateValues.push(gender);
  }

  if (age !== undefined) {
    updateFields.push('age = ?');
    updateValues.push(age);
  }

  if (password !== undefined) {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (hashError, hashedPassword) => {
      if (hashError) {
        console.error('Error hashing password:', hashError);
        return res.status(500).json({ error: 'Error hashing password' });
      }

      updateFields.push('password = ?');
      updateValues.push(hashedPassword);

      performUpdate();
    });
  } else {
    performUpdate();
  }

  function performUpdate() {
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE userId = ?`;
    const values = [...updateValues, userId];

    pool.query(updateQuery, values, (err, results) => {
      if (err) {
        console.error('Error updating user data:', err);
        return res.status(500).json({ error: 'Error updating user data' });
      }

      console.log('Updated rows:', results.affectedRows);
      res.json({ status: 'Success', message: 'User data updated successfully', results });
    });
  }
});

router.post('/scan-food/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ error: 'Missing required fields for scan-food' });
    }

    const insertFoodSql = 'INSERT INTO history (foodId, userId, date) VALUES (?, ?, NOW())';
    const values = [foodId, userId];

    const queryResult = await pool.query(insertFoodSql, values);

    if (!queryResult) {
      throw new Error('Error executing query');
    }

    const rowsAffected = queryResult.affectedRows !== undefined ? queryResult.affectedRows : 1;

    console.log('Inserted rows:', rowsAffected);
    res.json({ status: 'Success', message: 'Food data inserted into history successfully', rowsAffected });
  } catch (error) {
    console.error('Error inserting food data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;





//-------------------------USER-----------------------------//

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user registration and authentication
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               weight:
 *                 type: number
 *                 description: The weight of the user
 *               height:
 *                 type: number
 *                 description: The height of the user
 *               gender:
 *                 type: string
 *                 description: The gender of the user (M/F)
 *               age:
 *                 type: integer
 *                 description: The age of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User data inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 results:
 *                   type: object
 *                   description: Insertion result details
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                     affectedRows:
 *                       type: integer
 *                     insertId:
 *                       type: integer
 *                     serverStatus:
 *                       type: integer
 *                     warningCount:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     protocol41:
 *                       type: boolean
 *                     changedRows:
 *                       type: integer
 *       400:
 *         description: Bad request, missing required fields or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user registration and authentication
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: User not found or invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user data
 * /user/{userId}:
 *   put:
 *     summary: Update user data
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               weight:
 *                 type: number
 *                 description: The weight of the user
 *               height:
 *                 type: number
 *                 description: The height of the user
 *               gender:
 *                 type: string
 *                 description: The gender of the user (M/F)
 *               age:
 *                 type: integer
 *                 description: The age of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The new password of the user
 *     responses:
 *       200:
 *         description: User data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 results:
 *                   type: object
 *                   description: Update result details
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                     affectedRows:
 *                       type: integer
 *                     insertId:
 *                       type: integer
 *                     serverStatus:
 *                       type: integer
 *                     warningCount:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     protocol41:
 *                       type: boolean
 *                     changedRows:
 *                       type: integer
 *       400:
 *         description: No valid fields provided for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */


//-------------------------FOODS-----------------------------//

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: API for managing food data
 * /foods:
 *   get:
 *     summary: Get all foods
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of foods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 food:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       foodId:
 *                         type: integer
 *                         description: The ID of the food
 *                       name:
 *                         type: string
 *                         description: The name of the food
 *                       calorie:
 *                         type: number
 *                         description: The calorie content of the food
 *                       protein:
 *                         type: number
 *                         description: The protein content of the food
 *                       fat:
 *                         type: number
 *                         description: The fat content of the food
 *                       carbo:
 *                         type: number
 *                         description: The carbohydrate content of the food
 *                       water:
 *                         type: number
 *                         description: The water content of the food
 *                       imageUrl:
 *                         type: string
 *                         description: URL of the food image
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: API for managing user food scan history
 * /scan-food/{userId}:
 *   post:
 *     summary: Scan and insert food data into user history
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foodId:
 *                 type: integer
 *                 description: The ID of the scanned food
 *     responses:
 *       200:
 *         description: Food data inserted into history successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 rowsAffected:
 *                   type: integer
 *                   description: The number of rows affected in the database
 *       400:
 *         description: Missing required fields for scan-food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */

//-------------------------RECIPE-----------------------------//

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API for managing recipe data
 * /list:
 *   get:
 *     summary: Get a list of recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 recipes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       recipe_id:
 *                         type: integer
 *                         description: The ID of the recipe
 *                       name:
 *                         type: string
 *                         description: The name of the recipe
 *                       ingredients:
 *                         type: string
 *                         description: The ingredients of the recipe
 *                       description:
 *                         type: string
 *                         description: The description of the recipe
 *                       imageUrl:
 *                         type: string
 *                         description: URL of the recipe image
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API for managing user favorite recipes
 * /recipe/favorites/{userId}:
 *   get:
 *     summary: Get user's favorite recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of user's favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       favoriteId:
 *                         type: integer
 *                         description: The ID of the favorite entry
 *                       userId:
 *                         type: integer
 *                         description: The ID of the user
 *                       recipe_id:
 *                         type: integer
 *                         description: The ID of the favorite recipe
 *                       food_name:
 *                         type: string
 *                         description: The name of the favorite recipe
 *                       add_at:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the recipe was added to favorites
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API for managing user favorite recipes
 * /recipe/{userId}:
 *   post:
 *     summary: Add a recipe to user favorites
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_id:
 *                 type: integer
 *                 description: The ID of the recipe to add to favorites
 *     responses:
 *       200:
 *         description: Favorite recipe added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 result:
 *                   type: object
 *                   description: Add favorite result details
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                     affectedRows:
 *                       type: integer
 *                     insertId:
 *                       type: integer
 *                     serverStatus:
 *                       type: integer
 *                     warningCount:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     protocol41:
 *                       type: boolean
 *                     changedRows:
 *                       type: integer
 *       400:
 *         description: Recipe ID is required or recipe is already a favorite for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       404:
 *         description: Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: API for managing user favorite recipes
 * /recipe/unfavorite/{userId}/{recipeId}:
 *   delete:
 *     summary: Remove a recipe from user favorites
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the recipe to remove from favorites
 *     responses:
 *       200:
 *         description: Recipe unfavorited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 unfavoritedRecipeName:
 *                   type: string
 *                   description: The name of the unfavorited recipe
 *                 deleteResults:
 *                   type: object
 *                   description: Delete result details
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                     affectedRows:
 *                       type: integer
 *                     insertId:
 *                       type: integer
 *                     serverStatus:
 *                       type: integer
 *                     warningCount:
 *                       type: integer
 *                     message:
 *                       type: string
 *                     protocol41:
 *                       type: boolean
 *                     changedRows:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

//-------------------------HISTORY-----------------------------//

/**
 * @swagger
 * tags:
 *   name: History
 *   description: API for managing user food scan history
 * /history:
 *   get:
 *     summary: Get user food scan history
 *     tags: [History]
 *     responses:
 *       200:
 *         description: List of user food scan history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 food:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       historyId:
 *                         type: integer
 *                         description: The ID of the history entry
 *                       foodId:
 *                         type: integer
 *                         description: The ID of the scanned food
 *                       userId:
 *                         type: integer
 *                         description: The ID of the user
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp of the food scan
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * tags:
 *   name: History
 *   description: API for managing user food scan history
 * /history/{userId}:
 *   get:
 *     summary: Get user-specific food scan history
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of user-specific food scan history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       historyId:
 *                         type: integer
 *                         description: The ID of the history entry
 *                       foodId:
 *                         type: integer
 *                         description: The ID of the scanned food
 *                       userId:
 *                         type: integer
 *                         description: The ID of the user
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp of the food scan
 *                       name:
 *                         type: string
 *                         description: The name of the scanned food
 *                       protein:
 *                         type: number
 *                         description: The protein content of the scanned food
 *                       fat:
 *                         type: number
 *                         description: The fat content of the scanned food
 *                       carbo:
 *                         type: number
 *                         description: The carbohydrate content of the scanned food
 *                       water:
 *                         type: number
 *                         description: The water content of the scanned food
 *       500:
 *         description: Internal server error
 */


//-------------------------GOALS-----------------------------//

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: API for managing user goals
 * /goals:
 *   post:
 *     summary: Set or update user goals
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               caloriesGoal:
 *                 type: number
 *                 description: The user's daily calories goal
 *     responses:
 *       200:
 *         description: Goals inserted/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 message:
 *                   type: string
 *                   description: A success message
 *       404:
 *         description: User or date not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */


/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: API for managing user goals
 * /goals/{userId}:
 *   get:
 *     summary: Get user daily goals and intake summary
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User daily goals and intake summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                 dailySummary:
 *                   type: object
 *                   properties:
 *                     goals:
 *                       type: object
 *                       properties:
 *                         calories:
 *                           type: number
 *                           description: The user's daily calories goal
 *                     intake:
 *                       type: object
 *                       properties:
 *                         totalCalories:
 *                           type: number
 *                           description: The user's total daily calorie intake
 *                         totalCarbo:
 *                           type: number
 *                           description: The user's total daily carbohydrate intake
 *                         totalFat:
 *                           type: number
 *                           description: The user's total daily fat intake
 *                         totalWater:
 *                           type: number
 *                           description: The user's total daily water intake
 *       404:
 *         description: Goals not found for the user or Calories goal not found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message
 */

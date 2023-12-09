const express = require('express');
const cors = require('cors');
const responseHelper = require('express-response-helper').helper();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const foodRoutes = require('./routes/food');
const historyRoutes = require('./routes/history');
const goalRoutes = require('./routes/goals');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(responseHelper);

app.use(foodRoutes);
app.use(userRoutes);
app.use(recipeRoutes);
app.use(historyRoutes);
app.use(goalRoutes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Balanzio API Documentation",
      version: "1.0.0",
      description:
        "This is a Balanzio API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

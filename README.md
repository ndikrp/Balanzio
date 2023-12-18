# Balanzio_Cloud Computing
![Balanzio](https://github.com/ndikrp/Balanzio/blob/2fbd99f001acf4ae1090a2943bb85a5d47ceec78/assets/balanzio-datar.png)

Hello guys!! this is Cloud Computing CH2-PS340 Team from application Balanzio

Balanzio API allows you to get the needed resources to make Balanzio application run seamlessly.
This service is using authentication to access each service. You need to login first to access the service. If you didn't have an account yet, please register on the registation service.

> Development URL for this service is: http://localhost:8080/

The service available:

- Authentications
  <pre>POST /register</pre>
  <pre>POST /login</pre>

- User
  <pre>GET  /user/{userId}</pre>
  <pre>PUT  /user/{userId}</pre>

- Foods
  <pre>GET  /foods</pre>
  <pre>GET  /foods/{category}</pre>
  <pre>POST /scan-food/{userId}</pre>
  
- Recipes
  <pre>GET  /list</pre>
  <pre>GET  /recipes/{recipe_id}</pre>
  <pre>GET  /recipes/favorite/{userId}</pre>
  <pre>POST  /recipes/{userId}</pre>
  <pre>DELETE  /recipes/unfavorite/{userId}/{recipeId}</pre>

- History
  <pre>GET  /history</pre>
  <pre>GET  /history/{userId}</pre>

- Goals
  <pre>GET  /goals/{userId}</pre>
  <pre>POST  /goals/{userId}</pre>


## Architecture
<p align="center">
  <img src="assets/Cloud Architecture.png" />
</p>

# Instructions

## 1. Install Dependencies

In order to run this project, you need to install dependecies first:
```bash
npm run install
```
### Dependency

* [Express](https://www.npmjs.com/package/express)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Mysql](https://www.npmjs.com/package/mysql)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [nodemon](https://www.npmjs.com/package/nodemon)

## 2. Run local Database

Please use local mysql database management e.g Phpmyadmin using [XAMPP](https://www.apachefriends.org/download.html)

## 3. Create Database

Create database according to this ERD:

<p align="center">
  <img src="assets/ERD Balanzio New.png" />
</p>

## 4. Configure .env

Create .env file 
```bash
DB_HOST=your_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database_name

JWT_SECRET=your_token
```

## 5. Run the project

Run the project in development mode

```bash
npm run start-dev
```

# Testing

This Web service use Postman to test
[Swagger API Documentation](https://backend-dot-balanzio.et.r.appspot.com) 

# Cloud Computing Team

|  Name | Bangkit ID | Contacts |
| ------------ | ------------ | ------------ |
| Andhika Rizky Aulia	 | C296BSY3630 | [Github](https://github.com/ndikrp) & [Linkedin](https://www.linkedin.com/in/andhika-rizky/)|
| Mirza Khazim Nugraha	 | C296BSY3892	| [Github](https://github.com/mirzakhzm) & [Linkedin](https://www.linkedin.com/in/mirza-khazim-nugraha-43578221b/) |

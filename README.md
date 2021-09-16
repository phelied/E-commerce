# [EN] E-Commerce : MatrixTechTips

Hi everyone !

Here's your precious **README** so don't you forget to read it or you will experience **DEATH**.

## Installation :

- First of all let's clone this wonderful repo.
- Once done, put that repo wherever you want.
- Now you need to create a **.env** file in **server/** folder, put this inside :
```markdown
TODO : Update .env file before publish !
```
- **IMPORTANT** : Don't forget to edit the **server/.env** to match your fits of course.
- Then create a **env.js** file in **client/src/config** folder, put this inside :
```javascript
const API = "https://localhost:8000";
export default API;
```
- Now don't forget to :
```shell
cd server/
composer install
php bin/console doctrine:schema:update --force

cd client/
npm install
```
- Finally, you can start the client and the API using ( I recommend installing [Symfony CLI](https://symfony.com/download) ) :
```shell
cd server/
symfony serve

cd client/
npm start
```

## API :

|          | Routes       | Method | Response ( Success )         | Response ( Failure ) |
|----------|--------------|--------|------------------------------|----------------------|
| **User** | /register    | POST   | 200 + message                | 400 + message        |
| **User** | /login       | POST   | 200 + message + user + token | 400 + message        |
| **User** | /logout      | POST   | 200 + message                | 400 + message        |
| **User** | /user/update | POST   | 200 + message                | 400 + message        |
| **User** | /user/delete | POST   | 200 + message                | 400 + message        |

## Fetching :

- First you need to import the **client/src/config/env.js** previously created ( GET BACK TO **STEPS** SECTION IF YOU DIDN'T ) in your React components :
```javascript
import API from "../../config/env.js";
```
- Then concat **API** const in your **fetch url** :
```javascript
fetch(API + route, options)
.then((response) => { return response.json(); })
.then((response) => { /* Put your code here */ })
.catch((error) => { /* Put whatever error handler here */ });
/* NOTE : The route variable refers to the API routes, check the previous table under API section. */
```

## Stylesheets :

We are using CSS variables, feel free to change them as it suits you.
CSS variables are set in **client/src/index.css**.
Keyframes as well.

## Team :

| Amine | Daniel | Alexis | Ophélie | Xavier |
|-------|--------|--------|---------|--------|

Feel free to check our LinkedIn profiles :
- [Amine Belkheiri](https://www.linkedin.com/in/amine-belkheiri/)
- [Daniel Cadeau](https://www.linkedin.com/in/daniel-cadeau-dev/)
- [Alexis Gueudre](https://www.linkedin.com/in/alexis-gueudre/)
- [Ophélie Diomar](https://www.linkedin.com/in/ophelie-diomar-680162209/)
- [Xavier Vauconsant](https://www.linkedin.com/in/xavier-vauconsant-5956481a3/)
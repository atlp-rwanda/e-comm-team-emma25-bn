This is back-end API for e-commerce in Team emma

- [Project information](#project-information)
- [Getting started](#getting-started)
  - [Tools used](#tools-used)
  - [Installation](#installation)
  - [Running the app](#running-the-app)


### Project information
The backend API for an e-commerce app

### Getting started
You can clone this repo and start to add/change some features

#### Tools used
- Languages
  - typescript
- Software
  - NodeJs
  - PostgreSQL
  - Text Editor or IDE
  
- Dependencies
  - express
  - dotenv
  - sequelize ORM
  - pg
  - pg-hstore
- devDependencies
  - nodemon
- Stack to use
  **PERN:** PostgreSQL Express React NodeJS

#### Installation
```bash 
1. Clone a repository
git clone https://github.com/atlp-rwanda/team-emma-25-e-comm-backend.git

2. change directory 
cd team-emma-25-e-comm-backend

3. Install dependencies
npm install

4. Creating .env and add environment variables(Example)
nano .env 
    PORT = 5000
5. Save the .env file

```
#### Running the app
```bash
npm start
```


- [**dist**](dist) (Contains all compiled js files ignored by default)
- [**src**](src) (Contains all source files)
    - [**auth**](src/auth) (Contains all files to be used in authentication and authorization such as passport)
    - [**controllers**](src/controllers) (Contains all routes controller functions)
    - [**db**](src/db)
    - [**models**](src/models) (Contains all models)
    - [**routes**](src/routes) (Contains all routes in the app)
    - [**test**](src/test) (Contains all test files)


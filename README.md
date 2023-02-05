[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-emma25-bn/badge.svg?branch=ch-test-code-coverage-%23184359063)](https://coveralls.io/github/atlp-rwanda/e-comm-team-emma25-bn?branch=ch-test-code-coverage-%23184359063)

This is back-end API for e-commerce in Team emma

### Table of Content

- [Table of Content](#table-of-content)
- [Project information](#project-information)
- [Getting started](#getting-started)
  - [Tools used](#tools-used)
  - [Installation](#installation)
    - [Cloning and move into the repo](#cloning-and-move-into-the-repo)
    - [Installing the packages](#installing-the-packages)
    - [.env file](#env-file)
  - [Running the app](#running-the-app)
- [Folder structure](#folder-structure)
- [Contributing](#contributing)

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
  - @types/bcrypt
  - @types/express
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
  - eslint
  - ts-node-dev
  - jest
- Stack to use
  **PERN:** PostgreSQL Express React NodeJS

#### Installation

##### Cloning and move into the repo

```bash
git clone https://github.com/atlp-rwanda/e-comm-team-emma25-bn.git
```

```bash
cd e-comm-team-emma25-bn
```

##### Installing the packages

```bash
npm install
```

##### .env file

Before running the app you need to create **.env** file to write environment variables

```bash
touch .env
```

After creating it add **PORT** &amp; **DBLINK** value.
**DBLINK** is an online postgresql DB you can put your own

#### Running the app

```bash
npm start
```

### Folder structure

- [**dist**](dist) (Contains all compiled js files ignored by default)
- [**src**](src) (Contains all source files)
  - [**auth**](src/auth) (Contains all files to be used in authentication and authorization such as passport)
  - [**controllers**](src/controllers) (Contains all routes controller functions)
  - [**db**](src/db)
  - [**models**](src/models) (Contains all models)
  - [**routes**](src/routes) (Contains all routes in the app)
  - [**test**](src/test) (Contains all test files)

### Contributing

Feel free to create/add a feature or report a bug.
You can pull a request here 👉[Create a pull request](https://github.com/atlp-rwanda/e-comm-team-emma25-bn/pulls). <br>
Report a bug here 👉[Submit issue](https://github.com/atlp-rwanda/e-comm-team-emma25-bn/issues)

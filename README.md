[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-emma25-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/e-comm-team-emma25-bn?branch=develop)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com) [![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/e-comm-team-emma25-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/e-comm-team-emma25-bn?branch=develop)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/e-comm-team-emma25-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/e-comm-team-emma25-bn/tree/develop) <br>
**This is back-end API for e-commerce in Team emma**
<hr>

### Table of Content

- [Table of Content](#table-of-content)
- [Project information](#project-information)
- [Setup](#setup)
  - [Technologies used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Cloning and move into the cloned repo](#cloning-and-move-into-the-cloned-repo)
    - [Installing the packages](#installing-the-packages)
      - [Check installation errors](#check-installation-errors)
    - [.env file](#env-file)
  - [Running the app](#running-the-app)
- [Testing](#testing)
  - [Running the tests](#running-the-tests)
  - [Writing the tests](#writing-the-tests)
- [Folder structure](#folder-structure)
- [Contributing](#contributing)

### Project information

The backend API for an e-commerce app

### Setup

You can clone this repo and start to add/change some features

#### Technologies used

- Languages
  - TypeScript
- Package Manager
  - npm
- Software
  - NodeJs
  - PostgreSQL
  - Text Editor or IDE
- Testing
  - jest
  - supertest
- API Documentation
  - Swagger Documentation
- Stack to use
  **PERN:** PostgreSQL ExpressJS ReactJS NodeJS

#### Getting Started

##### Cloning and move into the cloned repo

```bash
git clone https://github.com/atlp-rwanda/e-comm-team-emma25-bn.git e-commerce-backend
```

```bash
cd e-commerce-backend
```

##### Installing the packages

```bash
npm install
```
###### Check installation errors

run `npm list` if you find __UNMET__ or other package related errors re-install `npm i`

##### .env file

Before running the app you need to create **.env** file to write environment variables

```bash
touch .env
```
Required Environment Variables

```bash
PORT = 
JWT_SECRET = 
DBLINK = 
TWILIO_AUTH_TOKEN = 
TWILIO_SERVICE_SID = 
TWILIO_PHONE_NUMBER = 
TWILIO_ACCOUNT_SID = 

CLIENT_ID=
CLIENT_SECRET=
CallBackURL=

USER=
NODEMAILER_CLIENT_ID=
MODEMAILER_CLIENT_SECRET=
MAILER_REFRESH_ACCESSTOKEN=
MAILER_ACCESS_TOKEN=

FAKE_TOKEN = 
SELLER_TOKEN = 
```

**DBLINK** is an online postgresql DB you can put your own

#### Running the app
```bash
npm start
```
or
```bash
npm run dev
```
### Testing
#### Running the tests
To run the tests you have to run: 
```bash
npm run test
```
#### Writing the tests
To write the test for your features you need to place your test files in the `__tests__` directory in your working directory <br>
Your tests files should be named like `filename.test.ts`


### Folder structure

```
📦src 
 ┣ 📂config         # Configuration files like auth configs
 ┣ 📂controllers    # All Controller classes/functions.
 ┣ 📂db             # Includes all database data/configs/models/migrations ...
 ┃ ┣ 📂migrations       # Migration files
 ┃ ┣ 📂models           # All models
 ┣ 📂docs           # Includes swagger doc configurations
 ┣ 📂helper         # All helpers to be used
 ┣ 📂middlewares    # Application middlewares 
 ┣ 📂models         # Some app models [Soon will be moved into db/models]
 ┣ 📂routes         # All Application routes
 ┣ 📂utils          # App instance file
```

### Contributing

Feel free to create/add a feature or report a bug.
You can pull a request here 👉[Create a pull request](https://github.com/atlp-rwanda/e-comm-team-emma25-bn/pulls). <br>
Report a bug here 👉[Submit issue](https://github.com/atlp-rwanda/e-comm-team-emma25-bn/issues)

🛑⚠ [Read Engineering Playbook](https://github.com/atlp-rwanda/engineering-playbook/wiki) 
You can follow these steps in order to contribute on this project:
1. Create a branch `git checkout -b prefix-branch-name`
   prefix can be: 
    1. ft: feature
    2. bg-fx: bug fix
2. After all your changes (includes documentation) push the source codes
3. Open a pull request
4. Tag at least 2 team members for review and make sure to add a label for the branch status.
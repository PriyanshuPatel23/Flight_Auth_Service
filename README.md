# Welcome to Auth Service

### Project Setup
- Clone the project on your local
- Execute `npm install` on the same path as of your root directory of the downloaded project
- Create a `.env` file in the root directory and add the following enviroment variables
    - `PORT=3001`
    - `JWT_KEY = SomeRandomKey`
    - `DB_SYNC=true`
- Inside the `src/config` folder create a new config.json and the following piece of json.

### To initialize Sequelize 
- `npx sequelize init`

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "AUTH_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}


```

- Once you've added your db config as listed above go to src folder from your terminal and execute `npx sequelize db:create`

and then execute `npx sequelize db:migrate`


## DB Design
 - User
 - Role
 - User_Roles

 - A User belongs to many Role and one Role can be used in many User.
 - So both the tables are connected to each other Through the table of User_Roles

## Tables

### User -> id, email, password, created_at, updated_at
### Role -> id, name, created_at, updated_at
    Relationship -> User has many Role and Role belongs to many User (many to many)

### Code to generate models
```
npx sequelize model:generate --name User --attributes name:String
```
### Code to generate Seeders file
```
npx sequelize seed:generate --name add-roles
```
```
npx sequelize db:seed:all
```
# Contact list App

Contact list App is an api that allows users to add new contacts, get all user contacts and get recent contacts.

## Features

- Add New Contacts (authed): User add new contact. 

- Get All User Contacts (authed): Get all user contacts with pageNum (limit 5 per page)

- Get Recent Contacts (authed): get latest transactions with user contacts (limit 5)

## How to run

1- Run this command to install node modules:

```json
$ npm i
```

2- Inside the project directory run: (to import database collections and data)

```json
$ mongorestore --db ContactList ./database/
```

3- To start the project run this command:
```json
$ npm start
```

## API Doc

Postman API collection link:
[Contact list Postman collection](https://www.getpostman.com/collections/6a797c40d3787228aa75)

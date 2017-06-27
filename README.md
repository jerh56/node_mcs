# NodeJS MCS
Node architecture as Model-Controller-Service (MCS)

## How to install
To install dependencies run `npm install`. The dependencies used in this project are:
- express
- body-parser
- mongoose

## MongoDB database
This project need a MongoDB instance running. You can set the port, user and password in the configuration file placed at `config/develop.json`.

If you will need a user name and password to connect to the database, set the flag security of database object to `true`, and set the user name and password. All this in the config file.

```javascript
{
  "database": {
    "products": {
      "host": "localhost",
      "port": "27017",
      "name": "node_mcs_products",
      "security": true,
      "user": "user_name",
      "password": "super_password"
    }
  }
}
```

## Testing the app
There's only one service created called `/products`, you can run it via **postman** as `localhost:3000/products`. The HTTP verbs available are:
- POST
- GET
- GET/:id
- PUT/:id
- DELETE/:id

The body for POST and PUT methods have to be sent as `application/json` content type and expected the next format:
```javascript
{
	"name": "Product Name",
	"price": 1
}
```

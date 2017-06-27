const ENV = process.env.NODE_ENV || 'develop';
const CONFIG = require('../config/'+ ENV +'.json');
const router = require('express').Router();
const mongoose = require('mongoose');
const route = '/products';

var database = CONFIG.database.products;
var dbConnection;
var connectionString = 'mongodb://';
var connectionName = 'Productos';

if (database.security) {
  connectionString += database.user + ':' + database.password + '@';
}

connectionString += database.host + ':' + database.port + '/' + database.name;
mongoose.Promise = global.Promise;

dbConnection = mongoose.createConnection(connectionString);

dbConnection.on('error', function( error ) {
  console.log(`Databse connection failed: ${connectionName} >` + error.message);
});

dbConnection.on('open', function() {
  console.log(`Connected to database: ${connectionName} > ${database.name}@${database.host}`);
});

const ProductsContorller = require('../controllers/products.controller.js');
let productsController = new ProductsContorller(dbConnection);

router.post(route, addProduct);
router.get(route, getProducts);
router.get(`${route}/:id`, getOneProduct);
router.put(`${route}/:id`, updateProduct);
router.delete(`${route}/:id`, removeProduct);

module.exports = router;

function addProduct( req, res ) {
  productsController.add(req.body, (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
  });
}

function getProducts( req, res ) {
  productsController.get((error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
  });
}

function getOneProduct( req, res ) {
  productsController.getOne(req.params.id, (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
  });
}

function updateProduct( req, res ) {
  productsController.update(req.params.id, req.body, (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
  });
}

function removeProduct( req, res ) {
  productsController.remove(req.params.id, (error, data) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(data);
    }
  });
}

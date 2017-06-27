module.exports = function( dbConnection ) {
  require('../models/product.model.js');
  var Product = dbConnection.model('Product');

  var controller = {};
  controller.add = add;
  controller.get = get;
  controller.getOne = getOne;
  controller.remove = remove;
  controller.update = update;

  return controller;

  function add(data = {}, next) {
    // Validaciones
    let error, errors = [];
    if (error = validateName(data.name)) {
      errors.push(error);
    }
    if (error = validatePrice(data.price)) {
      errors.push(error);
    }

    if(errors.length) {
      next({type: 'validation', messages: errors}, null);
    } else {
      let product = new Product(data);
      product.save(error => {
        if (error) {
          next({type: 'database', message: error.message}, null);
        } else {
          next(null, product);
        }
      });
    }
  }

  function get( next ) {
    Product.find((error, data) => {
      if (error) {
        next({type: 'database', message: error.message}, null);
      } else {
        next(null, data);
      }
    });
  }

  function getOne( id, next ) {
    let match = {_id: id};
    Product.findOne(match, (error, data) => {
      if (error) {
        next({type: 'database', message: error.message}, null);
      } else {
        next(null, data);
      }
    });
  }

  function remove( id, next ) {
    let match = {_id: id};
    Product.remove(match, (error, data) => {
      if (error) {
        next({type: 'database', message: error.message}, null);
      } else {
        next(null, data);
      }
    });
  }

  function update( id, data, next ) {
    // Validaciones
    let error, errors = [];
    if (error = validateName(data.name)) {
      errors.push(error);
    }
    if (error = validatePrice(data.price)) {
      errors.push(error);
    }

    if(errors.length) {
      next({type: 'validation', messages: errors}, null);
    } else {
      let match = {_id: id};
      let update = {$set: data};
      Product.update(match, update, (error, data) => {
        if (error) {
          next({type: 'database', message: error.message}, null);
        } else {
          next(null, data);
        }
      });
    }
  }

  function validateName( name ) {
    let error;
    if (!name || !name.trim()) {
      error = {field: 'name', code: 'empty'};
    }
    return error;
  }

  function validatePrice( price ) {
    let error;
    if (!price || !Number(price)) {
      error = {field: 'price', code: 'empty'};
    }
    return error;
  }
}

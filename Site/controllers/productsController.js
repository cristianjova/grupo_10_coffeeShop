const fs = require('fs');
const path = require ('path');
const tableName = require ('../database/jsontable');

const productsModel = tableName('products');

module.exports = {
  index: (req,res) => {

    let products = productsModel.all();
     


    res.render('products/list', {products});
  },
  detail: (req, res) => {
    let id = req.params.id;
    let product = productsModel.find(id);
    if (product){
      res.render('products/detail', {product});
    } else {
      res.render("No disponible");
    }
    
  },
  store: (req, res) => {
    res.render('products/create');
  },
  edit: (req, res) => {
    res.render('products/edit');
  },
  cart: (req, res) => {
    res.render('products/cart');
  }
}
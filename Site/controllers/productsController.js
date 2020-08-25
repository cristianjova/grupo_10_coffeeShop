const fs = require('fs');
const path = require ('path');
const tableName = require ('../database/jsontable');

const productsModel = tableName('products');
const toastedModel = tableName('toasted');
const typeModel = tableName('type');
const sizesModel = tableName('sizes');

module.exports = {
  index: (req,res) => {

    let products = productsModel.all();
     


    res.render('index/', {products});
  },
  detail: (req, res) => {
    let id = req.params.id;
    let product = productsModel.find(req.params.id)
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
    let product = productsModel.find(req.params.id)
    
    let sizes = sizesModel.all();
    let toasted = toastedModel.all();
    let type = typeModel.all();
    res.render('products/edit', { product,sizes,toasted,type});
  },
  update: (req, res) => {
      
      let product = req.body;
      product.id = req.params.id;
      if (req.file) {
          product.image = req.file.filename;
      } else if (req.body.oldImage) {
          product.image = req.body.oldImage;
      }
      delete product.oldImage;
      productsId = productsModel.update(product);
      res.redirect('/products/' + productsId)
  },
  cart: (req, res) => {
    res.render('products/cart');
  }
}
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
     


    res.render('products/list', {products});
  },
  detail: (req, res) => {
    let id = req.params.id;
    let product = productsModel.find(req.params.id)
    if (product){
      res.render('products/detail', {product});
    } 
    
  },
  create: (req, res) => {
    let sizes = sizesModel.all();
    let toasted = toastedModel.all();
    let type = typeModel.all();

    res.render('products/create', { sizes, toasted, type });
  },
  store: (req, res) => {
    let product = req.body;
    product.image = 'coffee-add-img.png';
    
    if(req.file) {
      product.image = req.body.filename;
    }

    let productId = productsModel.create(product);


    res.redirect('/products/' + productId);
  },
  cart: (req, res) => {
    res.render('products/cart');
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
  destroy: (req, res) => {
      let product = productsModel.find(req.params.id);
      let imagePath = path.join(__dirname, '../public/img/' + product.image);
      productsModel.destroy(req.params.id);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
      res.redirect('/products');
  }
  
}
const fs = require('fs');
const path = require ('path');
const { validationResult } = require('express-validator');
const tableName = require ('../database/jsontable');

const { product, size, toast, roast } = require('../database/models');


const productsModel = tableName('products');
const toastedModel = tableName('toasted');
const typeModel = tableName('type');
const sizesModel = tableName('sizes');

module.exports = {
  index: (req,res) => {
    product.findAll()
      .then(products => {
        return res.render('products/list', { products });
      })
      .catch(error => {
        console.log(error);
        return res.redirect('/')
      })
  },
  detail: (req, res) => {
    product.findByPk(req.params.id, {include: ['toast', 'size', 'roast']})
      .then(product => {
        return res.render('products/detail', { product });
      })
      .catch(error => {
        console.log(error);
        return res.redirect('/');
      })
  },
  create: async (req, res) => {
    let sizes = await size.findAll();
    let toasts = await toast.findAll();
    let roasts = await roast.findAll();

    res.render('products/create', { sizes, toasts, roasts });
  },
  store: async (req, res) => {
    let errors = validationResult(req);
    console.log(errors.mapped())
    if(!errors.isEmpty()) {
      // Elimino imagen subida
      if(req.file) {
        let imagePath = path.join(__dirname, '../public/img/' + req.file.filename);
  
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
      }

      let sizes = await size.findAll();
      let toasts = await toast.findAll();
      let roasts = await roast.findAll();

      return res.render('products/create', {
        sizes,
        toasts,
        roasts,
        errors: errors.mapped(),
        old: req.body
      });
    }

    let newProduct = req.body;
    newProduct.image = 'coffee-add-img.png';
    
    if(req.file) {
      newProduct.image = req.file.filename;
    } 
    console.log(newProduct);
    product.create(newProduct)
      .then(newProduct => {
        return res.redirect('/products/' + newProduct.id);
      })
      .catch(error => {
        console.log(error);
        return res.render('/');
      })
  },
  cart: (req, res) => {
    res.render('products/cart');
  },
  edit: async (req, res) => {
    let sizes = await size.findAll();
    let toasts = await toast.findAll();
    let roasts = await roast.findAll();

    product.findByPk(req.params.id)
      .then(product => {
        return res.render('products/edit', { product ,sizes, toasts, roasts });
      })
      .catch(error => {
        console.log(error);
        return res.render('/');
      })
  },
  update: (req, res) => {
      let updatedProduct = req.body;
      
      if (req.file) {
        updatedProduct.image = req.file.filename;
      } else if (req.body.oldImage) {
        updatedProduct.image = req.body.oldImage;
      }
      delete updatedProduct.oldImage;

      product.update(updatedProduct, {
        where: {
          id: req.params.id
        }
      })
        .then(updatedProduct => {
          return res.redirect('/products/' + req.params.id);
        })
        .catch(error => {
          console.log(error);
          return res.render('/');
        })
  },
  destroy: async (req, res) => {

    let existingProduct = await product.findByPk(req.params.id);
    let imagePath = path.join(__dirname, '../public/img/' + existingProduct.image);

    product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(deletedProduct => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
        return res.redirect('/products');
      })
      .catch(error => {
        console.log(error);
        return res.render('/');
      })
  }
  
}
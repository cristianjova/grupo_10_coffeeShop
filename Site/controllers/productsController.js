const fs = require('fs');
const path = require ('path');
const { validationResult } = require('express-validator');
const { Sequelize, Op } = require("sequelize");

const { product, size, toast, roast } = require('../database/models');


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
  search: async (req,res) => {
    try{
        let search = req.query.search.toLowerCase();
        let products = await product.findAll({
            where:{
              name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + search + '%') , 
            }
        });
        return res.render('products/list', { search, products });
    }catch(error){
        res.status(500).json({
            status:"error",
            data:error
        })
    }
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
    newProduct.image = 'coffee-add-img.webp';
    
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
  update: async (req, res) => {
    let errors = validationResult(req);
    console.log(errors.mapped());

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

      return res.render('products/edit', {
        sizes,
        toasts,
        roasts,
        errors: errors.mapped(),
        product: req.body 
      });
    }

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
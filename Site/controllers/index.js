const fs = require('fs');
const path = require ('path');
const tableName = require ('../database/jsontable');

const productsModel = tableName('products');

module.exports = {
    index: (req,res)=>{
        let products = productsModel.all();
        
        res.render('index/index', {products});
    },
    about: (req,res)=>{
        res.render('static/about');
    },
    contact: (req,res)=>{
        res.render('static/contact');
    },
};
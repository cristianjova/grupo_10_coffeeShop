const fs = require('fs');
const path = require ('path');
const { product } = require('../database/models');


module.exports = {
    index: (req,res)=>{
        product.findAll({
            limit: 10,
            order: [ [ 'id', 'DESC' ]]
        })
        .then(products => {
            return res.render('index/index', { products });
        })
        .catch(error => {
            console.log(error);
            return res.redirect('/')
        })
    },
    about: (req,res)=>{
        res.render('static/about');
    },
    contact: (req,res)=>{
        res.render('static/contact');
    },
};
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require ('path');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const { Sequelize, Op } = require("sequelize");
const { user, category, token } = require('../database/models');


module.exports = {
    register: (req,res)=>{
        res.render('users/register');
    },
    store: (req,res)=>{
        let errors = validationResult(req);


        if (errors.isEmpty()) {
            req.body.password = bcrypt.hashSync(req.body.password_register, 10);
            req.body.email = req.body.email_register;
            
            let newUser = req.body;
            if (req.file) {
                newUser.image = req.file.filename;
            }else{
                newUser.image = 'avatar.png';
            }
            delete newUser.category;
            delete newUser.password_register;
            delete newUser.email_register;
            user.create(newUser,{ include: category })
                .then(getUser=>{
                    return res.render('users/detail', { getUser });
                })
                .catch(error => {
                    console.log(error);
                    return res.render('/');
                  })

            //res.render('');
            res.redirect('login');
        } else {
            if(req.file) {
                let imagePath = path.join(__dirname, '../public/img/users/' + req.file.filename);
          
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
              }
            return res.render('users/register', {
                errorsReg: errors.mapped(),
                user: req.body
                
            })
        }
    },
    login: (req,res)=>{
        res.render('users/login');
    },
    authenticate: (req, res) => {
        let errors = validationResult(req);

        // Si hay errores en los campos
        if(!errors.isEmpty()) {
            return res.render('users/login', {
                errors: errors.mapped(),
                user: req.body
            })
        }
        user.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(async userFound => {

            if(userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
                delete userFound.password;
                req.session.user = userFound;

                // Remember me
                if (req.body.rememberMe) {
                    const tokenCrypto = crypto.randomBytes(64).toString('base64');
                    await token.create({
                        'hash': tokenCrypto,
                        'user_id': userFound.id
                    });
                    res.cookie('userToken', tokenCrypto, {maxAge: 1000 * 60 * 60 * 24 * 30 * 1});
                }
                
                return res.redirect('/');
            } else {
                return res.render('users/login', {
                    errors: { credentials: { msg: 'Crendenciales inválidas' }},
                    user: req.body
                })
            }
        })
        .catch(error => {
            return res.render('users/login', {
                errors: { credentials: { msg: 'Crendenciales inválidas' }},
                user: req.body
            })
        })
    },
    logout: (req,res)=>{
        if(req.cookies.userToken) {
            token.destroy({ where: { hash: req.cookies.userToken}});
            res.clearCookie('userToken');
        }
        req.session.destroy();
        return res.redirect('/');
    },
    list: async (req,res)=>{
        let search = req.query.search;
        if(search){
            let users = await user.findAll({
                attributes:["id","first_name","last_name","email","image"],
                where:{
                    [Op.or]: [
                        { first_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('first_name')), 'LIKE', '%' + search + '%')} ,
                        { last_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('last_name')), 'LIKE', '%' + search + '%')} ,
                        { email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + search + '%')},
                        { last_name: {[Op.like]:"%"+search+"%"} }, 
                        { first_name: {[Op.like]:"%"+search+"%"} },
                        { email: {[Op.like]:"%"+search+"%"} }
                    ],
                    
                }
            },{ include: category });
            return res.render('users/list', { search, users });
        }else{
            user.findAll({ include: category })
            .then(users => {
                return res.render('users/list', { users });
                //return res.send(users);
            })
            .catch(error => {
                console.log(error);
                return res.redirect('/')
            })
        }
        

        //-------------------------------------------------
        
    },
    show: (req, res) => {
        user.findByPk(req.params.id,{ include: 'category' })
            .then(getUser=>{
                res.render('users/detail', { getUser });
            })
            .catch(err=>{
                res.render('users/404');
            });
    },
    edit: async (req, res) => {
        const categories = await category.findAll();
        user.findByPk(req.params.id, { include: 'category' })
        .then(getUser => {
            return res.render('users/edit',  { getUser, categories });
        })
        .catch(error => {
            console.log(error);
            return res.redirect('/');
        })
    },
    update: async (req, res) => {
        let errors = validationResult(req);
        console.log(errors.mapped());

        if(!errors.isEmpty()) {
            // Elimino imagen subida
            if(req.file) {
                let imagePath = path.join(__dirname, '../public/img/users/' + req.file.filename);
        
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }

            const categories = await category.findAll();

            return res.render('users/edit', {
                categories,
                errors: errors.mapped(),
                getUser: req.body 
            });
        }

        let updatedUser = req.body;
        
        if (req.file) {
            updatedUser.image = req.file.filename;
        } else if (req.body.oldImage) {
            updatedUser.image = req.body.oldImage;
        }
        delete updatedUser.oldImage;

        user.update(updatedUser, {
            where: {
            id: req.params.id
            }
        })
        .then(() => {
            delete updatedUser.password;
            req.session.user = updatedUser;
            return res.redirect('/user/' + req.params.id);
        })
        .catch(error => {
          console.log(error);
          return res.render('/');
        })
    },
    destroy: async (req, res) => {
        let existingUser = await user.findByPk(req.params.id);
        let imagePath = path.join(__dirname, '../public/img/users/' + existingUser.image);

        user.destroy({ where: { id: req.params.id } })
        .then(deletedUser => {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }

            return res.redirect('/user/list');
        })
        .catch(error => {
            console.log(error);
            return res.render('/');
        })
    },
    search: async (req,res) => {
        /* try{
            let search = req.query.search;
            let users = await user.findAll({
                attributes:["first_name","last_name","email","image"],
                where:{
                    [Op.or]: [
                        //equelize.fn('LOWER', sequelize.col('first_name')), 'LIKE', '%'+search+'%'
                        { last_name: {[Op.like]:"%"+search+"%"} }, 
                        {first_name: {[Op.like]:"%"+search+"%"} },
                        {email: {[Op.like]:"%"+search+"%"} }
                    ],
                    
                }
            },{ include: category });
            if (users.length) 
                {return res.render('users/list', { search, users });
            }else{
                user.findAll({ include: category })
                .then(users => {
                    return res.render('users/list', {search, users });
                    //return res.send(users);
                })
                .catch(error => {
                    console.log(error);
                    return res.redirect('/')
                })
            }
            //return console.log(users);
        }catch(error){
            res.status(500).json({
                status:"error",
                data:error
            })
        } */
    }
};
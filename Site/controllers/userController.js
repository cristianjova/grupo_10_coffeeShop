const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const tableName = require ('../database/jsontable');
const usersModel = tableName('users');
const usersTokensModel = tableName('usersTokens');


module.exports = {
    register: (req,res)=>{
        res.render('users/register');
    },
    store: (req,res)=>{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            let user = req.body;
            if (req.file) {
                user.image = req.file.filename;
            }else{
                user.image = 'default.png';
            }
            userId = usersModel.create(user);

            //res.render('');
            res.redirect('login');
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

        let user = usersModel.findByField('email', req.body.email);

        // Si no existe el usuario o la contraseña no es valida
        if(!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.render('users/login', {
                errors: { credentials: { msg: 'Crendenciales inválidas' }},
                user: req.body
            })
        }

        // Pase los controles, logueo usuario
        delete user.password
        req.session.user = user; 

        //Remember me
        if (req.body.rememberMe) {
            const token = crypto.randomBytes(64).toString('base64');

            usersTokensModel.create({ userId: user.id, token });

            res.cookie('userToken', token, {maxAge: 1000 * 60 * 60 * 24 * 30 * 1})
        }
        return res.redirect('/');
    },
    logout: (req,res)=>{

        let userTokens = usersTokensModel.findAllByField('userId', req.session.user.id);
        userTokens.forEach(userToken => {
            usersTokensModel.delete(userToken.id);
        })

        res.clearCookie('userToken');
        
        req.session.destroy();

        return res.redirect('/');
    },
};
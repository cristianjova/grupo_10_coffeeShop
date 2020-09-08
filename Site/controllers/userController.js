const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const tableName = require ('../database/jsontable');

const usersModel = tableName('users');

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

        return res.redirect('/');
    },
    logout: (req, res) => {
        req.session.destroy();

        return res.redirect('/');
    }
};
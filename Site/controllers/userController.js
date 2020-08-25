const bcrypt = require('bcrypt');
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

};
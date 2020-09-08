const bcrypt = require('bcrypt');
const crypto = require('crypto');
const tableName = require ('../database/jsontable');
const usersModel = tableName('users');
const usersTokensModel = tableName('usersTokens');


module.exports = {
    authenticate: (req,res)=>{
        user = usersModel.findByField('email', req.body.email);

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)){

                delete user.password;

                req.session.user = user;

                //Remember me
                if (req.body.rememberMe) {
                    const token = crypto.randomBytes(64).toString('base64');

                    usersTokensModel.create({ userId: user.id, token });

                    res.cookie('userToken', token, {maxAge: 1000 * 60 * 60 * 24 * 30 * 1})
                }

                res.redirect('/');
            }
            else{
                res.render('users/login');
            }
            
        }
        else {
            res.render('users/login');
        }
        
    },
    
    login: (req,res)=>{
        res.render('users/login');
    },

    logout: (req,res)=>{

        let userTokens = usersTokensModel.findAllByField('userId', req.session.user.id);
        userTokens.forEach(userToken => {
            usersTokensModel.delete(userToken.id);
        })

        res.clearCookie('userToken');

        
        
        req.session.destroy();

        res.redirect('/');
    },
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


};
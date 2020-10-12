const tableName = require('../database/jsontable');
const usersModel = tableName('users');
const usersTokensModel = tableName('usersTokens');
const { user, token } = require('../database/models');

module.exports = async (req,res,next) =>{
    if (req.session.user){
        res.locals.userLoggedIn = req.session.user;

    } else if (req.cookies.userToken){
        try {
            let userToken = await token.findAll({ where : { hash: req.cookies.userToken}});
            
            if (userToken) {
                let user = await user.findByPk(userToken.user_id);
                if (user){
                    delete user.password;
                    req.session.user = user;
                    res.locals.userLoggedIn = user;
                }
    
            }else {
                res.clearCookie('userToken');
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/')
        }

    }
    next();

};
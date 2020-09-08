const tableName = require('../database/jsontable');
const usersModel = tableName('users');
const usersTokensModel = tableName('usersTokens');

module.exports = (req,res,next) =>{
    if (req.session.user){
        res.locals.userLoggedIn = req.session.user;

    } else if (req.cookies.userToken){
        let userToken = usersTokensModel.findByField('token', req.cookies.userToken);

        if (userToken) {
            let user = usersModel.find(userToken.userId);
            if (user){
                delete user.password;
                req.session.user = user;
                res.locals.userLoggedIn = user;
            }

        }else {
            res.clearCookie('userToken');
        }

    }
    next();

};
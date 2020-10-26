const { user, token } = require('../database/models');

module.exports = async (req,res,next) =>{
    if (req.session.user){
        res.locals.userLoggedIn = req.session.user;

    } else if (req.cookies.userToken){
        try {
            let userToken = await token.findOne({ where : { hash: req.cookies.userToken}});
            if (userToken) {
                let userBD = await user.findByPk(userToken.user_id);
                if (userBD){
                    delete userBD.password;
                    req.session.user = userBD;
                    res.locals.userLoggedIn = userBD;
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
module.exports = {
    index: (req,res)=>{
        res.render('index/index');
    },
    about: (req,res)=>{
        res.render('static/about');
    },
    contact: (req,res)=>{
        res.render('static/contact');
    },
};
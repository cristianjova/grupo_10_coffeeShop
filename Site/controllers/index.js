const path=require('path');

module.exports = {
    index: (req,res)=>{
        res.render(path.join(__dirname, '/../views/index/index'));
    }
};
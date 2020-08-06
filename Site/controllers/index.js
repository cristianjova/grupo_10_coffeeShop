module.exports = {
    index: (req,res)=>{
        res.sendFile(__dirname + '/../views/index/index')
    }
};
const Product = require("../models/product")
module.exports.getIndex = (req,res)=>{
   
    res.render("user/index.ejs",{
        title:"HomePage",
        path:"/"
        
    })
}
module.exports.getSkill = (req,res)=>{
    res.render("user/skills.ejs",{
        title:"Skills",
        path:"/skills"
    })
}

module.exports.getMyWorks = (req,res)=>{
    Product
        .find()
        .sort({date:-1})
        .then(products=>{
            res.render("user/myworks.ejs",{
                title:"My Works",
                products:products, 
                path:"/myworks"
            })
        })
}
module.exports.getAbout = (req,res)=>{
    res.render('user/aboutme.ejs',{
        title:'About Me',
        path:'/aboutme'
    })
}
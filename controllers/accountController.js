const User = require("../models/user");
const bcrypt = require("bcrypt");



module.exports.getLogin = (req, res) => {
    res.render("account/login.ejs", {
        title: "Login",
        path:"/login"
    })
}

module.exports.getRegister = (req, res) => {
    res.render("account/register.ejs", {
        title: "Register",

    })
}
module.exports.postRegister = (req, res) => {
    const {name,email,password} = req.body;
    User.findOne({email:email})
        .then(user=>{
            if(user){
                req.session.save(function(err){
                    return res.redirect('/register')
                })
            }
            return bcrypt.hash(password,10)
        })
        .then(hashedpassword=>{
            const newUser = new User({
                name:name,
                email:email,
                password:hashedpassword
            })
            return newUser.save()
        })
        .then(()=>{
            res.redirect('/login');
        })
}
module.exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email})
        .then(user=>{
            if(!user){
                req.session.save(function(err){
                    return res.redirect('/login')
                })
            }
            bcrypt.compare(password,user.password)
                .then(isSuccess=>{
                    if(isSuccess){
                        req.session.user = user;
                        req.session.isAuthenticated = true;
                        return req.session.save(function(err){
                            var url = req.session.redirectTo || '/';
                            delete req.session.redirectTo;
                            return res.redirect(url);
                        })
                    }
                    res.redirect('/login')
                })
        })
}

module.exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}

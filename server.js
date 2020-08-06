const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts"); 
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const multer = require('multer')
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin")
const accountRouter = require("./routes/account");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path")
const mongoDbStore = require("connect-mongodb-session")(session);
const csurf = require('csurf');


const User = require("./models/user");

var store = new mongoDbStore({
    uri:"mongodb+srv://okan154:8318913@cluster0.cvoee.mongodb.net/Products?retryWrites=true&w=majority",
    collection:"mySessions"
})

/* const mongoDbStore = require("connect-mongodb-session")(session); */

/* var store = new mongoDbStore({
    uri:"mongodb+srv://okan154:8318913@cluster0.cvoee.mongodb.net/Products?retryWrites=true&w=majority",
    collection:"mySession"
}) */
const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./public/img')
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
app.set("view engine","ejs");
app.set("views",__dirname + "/views");
app.set("layout","layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage:storage}).single('imageUrl'))
app.use(cookieParser()); 

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:360000},
    store:store
    
}))

app.use((req,res,next)=>{
    if(!req.session.user){
        return next()
    }
    User.findById(req.session.user._id)
        .then(user=>{
            req.user=user;
            next()
        })
        .catch(err=>console.log(err))
})

app.use(csurf());
app.use("/admin",adminRouter)
app.use(indexRouter);
app.use(accountRouter);

mongoose.connect("mongodb+srv://okan154:8318913@cluster0.cvoee.mongodb.net/Products?retryWrites=true&w=majority",{ useNewUrlParser: true })
    .then(()=>{
        
        console.log("Connected to mongo");
        app.listen(3000)
    })
    .catch(err=>{
        console.log(err)
    })
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const db = require("./config/MySQLDOA.js");
require('dotenv').config({path:"config/keys.env"});
const {getAndPutMetthodProcessing} = require("./middleware/HTTPMethods.js");
const  session = require("express-session");
const fileUpload = require('express-fileupload');

const adminController = require("./controllers/Admin.js");
const generalController = require("./controllers/General.js");
const taskController = require("./controllers/Task.js");
const userController = require("./controllers/User.js");
const authController = require("./controllers/Auth.js");

//load controllers
const app = express();

const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
   
    helpers: {
        ifEq(a, b, options) {
            if (a == b) { return options.fn(this); }
            return options.inverse(this);
        },
    }
});

//middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
 

//static asset middleware 
app.use(express.static("public"));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }));

  // default options
app.use(fileUpload());


//map controllers to express 

app.use(getAndPutMetthodProcessing);

app.use((req,res,next)=>{

    res.locals.user=req.session.user;
    next();
})

app.use("/",generalController);
app.use("/auth",authController);
app.use("/admin",adminController);
app.use("/user",userController);
app.use("/task",taskController);

//Web Sever config
app.listen(process.env.PORT,()=>{

    console.log(`Web Server is up and running`);

    db.init()
    .then(()=>{
        console.log("Connected to the database")
    })
    .catch(err=>{
        console.log(err)
    })

})
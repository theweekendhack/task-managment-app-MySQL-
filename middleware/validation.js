
const User = require("../models/POJO/User.js");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/User.js");

exports.userAddForm = (req,res,next)=>{

    
    const u = new User();
    u.firstName = req.body.firstName;
    u.lastName = req.body.lastName;
    u.gender = req.body.gender;
    u.username = req.body.username;
    u.password = req.body.password;
    u.email = req.body.email;


    req.user=u;
    
    let isError=false;
   
    const errors={
        firstName:null,
        lastName:null,
        gender:null,
        email:null,
        username:null,
        password:null
    }

    if(u.firstName == "")
    {
        isError=true;
        errors.firstName="You must enter a first Name";
    }

    if(u.lastName == "")
    {
        isError=true
        errors.lastName="You must enter a last Name";
    }


    if(u.gender==null)
    {
        isError=true
        errors.gender="You must select a gender";
    }
    
    if(u.email=="")
    {
        isError=true;
        errors.email="You must enter an email";
    }

    
    if(u.username=="")
    {
        isError=true;
        errors.username= "You must enter an username";
    }

    if(u.password=="")
    {
        isError=true;
        errors.password= "You must enter a password";
    }

   
    if(isError)
    {
        res.render("Admin/addUser",{
            title : "Add User",
            u,
            errors
        })
    }

    else
    {
        next();
    }



};

exports.loginFormValidation = (req,res,next)=>{

    
    const u = new User();
    u.password = req.body.password;
    u.email = req.body.email;

    req.user=u;
    
    let isError=false;
   
    const errors={
        email:null,
        password:null
    }
    
    if(u.email=="")
    {
        isError=true;
        errors.email="You must enter an email";
    }


    if(u.password=="")
    {
        isError=true;
        errors.password= "You must enter a password";
    }



    if(!isError)
    {
        console.log("Correct")
      
        userModel.findUserbyEmail(u)
        .then(user=>{
            if(user)
            {
           
                console.log("k")
                bcryptjs.compare(u.password, user.password)
                .then(response=>{

                    if(response)
                    {
                            req.user=user;//this is to assign the user object to the request object
                            //so that the other middleware function has access to it
                            next();
                    }

                    else
                    {
                        errors.password="Sorry you entered an incorrect username/password"
                        errors.email=null;
        
                        res.render("General/home",{
                            title : "Home Page",
                            u,
                            errors
                        })
                    }
                })
                .catch(err=>console.log(`Error ${err}`))
            }

            else    
            {

                console.log("email not found")
                errors.password="Sorry you entered an incorrect username/password"
                errors.username=null;

                res.render("General/home",{
                    title : "Home Page",
                    u,
                    errors
                })
            }
        })  
        .catch(err=>console.log(`Error fuck ${err}`))
    }

   
    else
    {
        res.render("General/home.handlebars",{
            title : "Home Page",
            u,
            errors
        })
    }

};

exports.uploadFormValdiation = (req,res,next)=>{
 
    let isError=false;
    let errors=null;
    
    console.log(req.files)
    if(!req.files)
    {
        isError=true;
        errors="You must upload a file";
    }

    else
    {
        console.log(req.files.photo)
        if(!req.files.photo.mimetype.includes("image"))
        {
            isError=true;
            errors="You must upload an image";
        }
    }

    if(!isError)
    {
        next();
          
    }
    else
    {
        res.render("User/uploadPhoto.handlebars",{
            title : "Upload Photo",
            errors
        })
    }

};
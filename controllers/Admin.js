const express = require('express')
const router = express.Router();
const User = require("../models/POJO/User.js");
const userModel = require("../models/User.js");
const {userAddForm} = require("../middleware/validation.js");
const bcryptjs = require("bcryptjs");

const auth = require("../middleware/auth.js");
const authorization=require("../middleware/authorization.js");
const Roles= require("../config/roles.js");


router.get("/dashboard",auth,authorization([Roles.Admin]),(req,res)=>{


    userModel.getAllUsers()

    .then(users=>{

       
        res.render("Admin/adminDashboard",{
            title: "Admin Dashboard",
            users
        })
    
    })
    .catch(err=>console.log(err))

});


router.get("/adduser",auth,authorization([Roles.Admin]),(req,res)=>{

    res.render("Admin/addUser",{
        title: "Create a User"
    })
});

router.post("/adduser",auth,authorization([Roles.Admin]),userAddForm,(req,res)=>{

    bcryptjs.genSalt(10)
    .then(salt=>{
        bcryptjs.hash(req.user.password,salt)
        .then(hash=>{
            req.user.password=hash;
            userModel.createUser(req.user)
            .then(()=>{
                res.redirect("/admin/dashboard")
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch(err=>console.log(`Error ${err}`));
    })
    .catch(err=>console.log(`Error ${err}`));


});


router.delete("/deactivateUser/:id",auth,authorization([Roles.Admin]),(req,res)=>{

        

        userModel.deleteUser(req.params.id)
        .then(()=>{

            console.log(req.params.id)
            res.redirect("/admin/dashboard")
        })
        .catch(err=>console.log(`Error ${err}`))
});


module.exports = router;
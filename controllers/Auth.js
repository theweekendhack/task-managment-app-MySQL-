const express = require('express');
const router = express.Router();
const {loginFormValidation} = require("../middleware/validation.js");

const Roles= require("../config/roles.js");

router.post("/login",loginFormValidation,(req,res)=>{

   
    //create User Session
    req.session.user=req.user;

    if(req.session.user.role==Roles.Admin)
    {

        res.redirect("/admin/dashboard");
    }

    else if(req.session.user.role==Roles.RegularUser)
    {
        console.log(req.session.user)
        res.redirect("/user/profile");
    }
});


router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/")
});




module.exports = router;
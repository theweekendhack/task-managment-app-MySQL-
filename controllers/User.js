const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const auth = require("../middleware/auth.js");
const authorization=require("../middleware/authorization.js");
const Roles= require("../config/roles.js");
const User = require('../models/POJO/User.js');
const userModel = require("../models/User.js");
const {uploadFormValdiation} = require("../middleware/validation.js");

router.get("/profile",auth,authorization([Roles.RegularUser]),(req,res)=>{

    res.render("User/userDashboard",{
        title:"User Profile Page"
    })
});

router.get("/upload",auth,authorization([Roles.RegularUser]), (req,res)=>{

    res.render("User/uploadPhoto",{
        title:"User Photo Upload"
    })
});

router.post("/upload",auth,authorization([Roles.RegularUser]),uploadFormValdiation,(req,res)=>{

    let photo = req.files.photo;

    const id = uuidv4();

    const fileNewName = `${id}_${photo.name}`;


    photo.mv(`public/img/uploads/${fileNewName}`)
    .then(()=>{

        const user = new User();
        user.id = req.session.user.id;
        user.img_path=fileNewName;
        
 
        userModel.updatePhoto(user)
        .then(()=>{
         
            req.session.user.img_path=user.img_path;
            res.redirect("/user/profile");
        })
        .catch(err=>console.log(err));

    })
    .catch(err=>console.log(`${err}`));

   
});


router.get("/password",auth,authorization([Roles.RegularUser]),(req,res)=>{

    res.render("User/changePassword",{
        title:"User Password"
    })
});


router.put("/user/password",auth,authorization([Roles.RegularUser]),(req,res)=>{

    res.send("Task's Edit form")
});


module.exports = router;
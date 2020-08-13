const express = require('express');
const router = express.Router();


router.get("/",(req,res)=>{

    res.render("General/home",{
        title:"Home Page"
    })
});



router.get("/contact-us",(req,res)=>{

    res.render("General/contactus",{
        title:"Contact Us"
    })
});

module.exports = router;
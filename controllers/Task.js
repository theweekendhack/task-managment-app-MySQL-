const express = require('express')
const router = express.Router();

const auth = require("../middleware/auth.js");
const authorization=require("../middleware/authorization.js");
const Roles= require("../config/roles.js");
const Task = require('../models/POJO/Task.js');
const taskModel = require("../models/Task.js");
const User = require('../models/POJO/User.js');

//const {taskFormValidation} = require("../middleware/validation.js");



router.get("/dashboard",auth,authorization([Roles.RegularUser]),(req,res)=>{


    
    taskModel.getAllTaskByUser(req.session.user)
    .then(tasks=>{

        let message = null
       
        if(!tasks)    
        {
            message="No Tasks in the databse"
        }

        res.render("task/taskDashboard",{
            title : "Task Dashboard",
            tasks,
            message
        })
    
    })
    .catch(err=>console.log(err))

});


router.get("/add",auth,authorization([Roles.RegularUser]),(req,res)=>{

    res.render("task/taskAddForm",{
        title : "Create a Task"
    })
});

router.post("/add",auth,authorization([Roles.RegularUser]),(req,res)=>{


    const task = new Task();

    task.title = req.body.title;
    task.description = req.body.description;

    const user  = new User();
    user.id= req.session.user.id;

    task.user = user;

    taskModel.createTask(task)
    .then(()=>{

        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error ${err}`));

 
});


router.get("/edit/:id",auth,authorization([Roles.RegularUser]),(req,res)=>{



    taskModel.getTask(req.params.id)
    .then((task)=>{

        res.render("task/taskEditForm",{
            title : "Edit Task Form",
            task
        })
    })
    .catch(err=>console.log(`Error ${err}`));


});


router.put("/edit/",auth,authorization([Roles.RegularUser]),(req,res)=>{


    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.description= req.body.description;

    taskModel.update(newTask,req.body.taskID)
    .then(()=>{

        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error ${err}`));

});

router.delete("/delete/:id",auth,authorization([Roles.RegularUser]),(req,res)=>{



    console.log(req.params.id)
    taskModel.delete(req.params.id)
    .then(()=>{

        console.log("k")
        res.redirect("/task/dashboard");
    })
    .catch(err=>console.log(`Error ${err}`));

});


module.exports = router;
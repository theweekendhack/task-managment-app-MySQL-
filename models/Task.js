const db = require("../config/MySQLDOA.js");
const Task = require("./POJO/Task.js");
const User = require("./POJO/User.js");

const taskModel = {


    SQL : "",

    createTask(task)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO task(title,description,user_id)
            VALUES(?,?,?)`
            db.connection.query(this.SQL,[task.title,task.description,task.user.id])
            .then(()=>
            {
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
        })
  
    },

    getAllTaskByUser(user)
    {


        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM Task WHERE user_id = ? ;`
            db.connection.query(this.SQL,[user.id])
            .then(([rows,fields])=>
            {  
                let tasks = null;
                
                if(rows.length > 0)
                {
                    tasks = [];
                    rows.forEach(row => {
                        
                        const task = new Task();
                        task.id = row.task_id;
                        task.title = row.title;
                        task.description = row.description;
    
                        const user = new User();
                        user.id = row.user_id;
    
                        task.user = user;
                        tasks.push(task);
    
                    });
                }
                resolve(tasks);
            })
            .catch(err=>{
                reject(err);
            })
        })
    },

    getTask(taskID)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM task WHERE task_id = ?;`
            db.connection.query(this.SQL,[taskID])
            .then(([rows,fields])=>
            {   
                const task = new Task();
                task.id = rows[0].task_id;
                task.title = rows[0].title;
                task.description = rows[0].description;
               
                resolve(task);
            })
            .catch(err=>{
                reject(err);
            })
        })

    },

   delete(task_id)
   {
    return new Promise((resolve,reject)=>{

        this.SQL = `DELETE FROM task WHERE task_id = ?`
        db.connection.query(this.SQL,[task_id])
        .then(()=>
        {
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })

   },

   update(newTask, currentTaskID)
   {
    return new Promise((resolve,reject)=>{

        this.SQL = `UPDATE task SET title = ? , description = ? WHERE task_id = ?`
        db.connection.query(this.SQL,[newTask.title, newTask.description,currentTaskID])
        .then(()=>
        {
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })

   },


}


module.exports=taskModel;



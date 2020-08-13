const db = require("../config/MySQLDOA.js");
const User = require("./POJO/User.js");

const userModel = {


    SQL : "",

    createUser(user)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `INSERT INTO user(firstName,lastName,email,password,gender)
            VALUES(?,?,?,?,?)`
            db.connection.query(this.SQL,[user.firstName,user.lastName,user.email,user.password,user.gender])
            .then(()=>
            {
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
        })
  
    },

    getAllUsers()
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM user;`
            db.connection.query(this.SQL)
            .then(([rows,fields])=>
            {
                const users = [];
                rows.forEach(row => {
                    
                    const user = new User();
                    user.firstName = row.firstName;
                    user.lastName = row.lastName;
                    user.id = row.user_id;
                    user.img_path=row.img_path;
                    user.email=row.email;
                    user.isActive=row.isActive;
                    user.role=row.role;

                   
                    users.push(user);

                });
                resolve(users);
            })
            .catch(err=>{
                reject(err);
            })
        })
    },

    getUser(user)
    {
        return new Promise((resolve,reject)=>{

            this.SQL = `SELECT * FROM user WHERE user_id = ?;`
            db.connection.query(this.SQL,[user.id])
            .then(([rows,fields])=>
            {   
                const user = new User();
                user.firstName = rows[0].firstName;
                user.lastName = rows[0].lastName;
                user.id = rows[0].user_id;
                user.img_path=rows[0].img_path;
                user.email=rows[0].email;
                user.isActive=rows[0].isActive;
                user.role=rows[0].role;

                resolve(user);
            })
            .catch(err=>{
                reject(err);
            })
        })

    },

   deleteUser(userID)
   {
    return new Promise((resolve,reject)=>{

        this.SQL = `DELETE FROM user WHERE user_id = ?`
        db.connection.query(this.SQL,[userID])
        .then(()=>
        {
            resolve();
        })
        .catch(err=>{
            reject(err);
        })
    })

   },

   findUserbyEmail(user)
   {
    return new Promise((resolve,reject)=>{

        this.SQL = `SELECT * FROM user WHERE email = ?;`
        db.connection.query(this.SQL,[user.email])
        .then(([rows,fields])=>
        {   
    
            let user = null;

            if(rows.length > 0 )
            {
                user = new User();
                user.firstName = rows[0].firstName;
                user.lastName = rows[0].lastName;
                user.id = rows[0].user_id;
                user.img_path=rows[0].img_path;
                user.email=rows[0].email;
                user.isActive=rows[0].isActive;
                user.role = rows[0].role;
                user.password=rows[0].password;
               
            }
        
            resolve(user);
           
        })
        .catch(err=>{
            reject(err);
        })
    })
   },

   updatePhoto(user)
   {
    return new Promise((resolve,reject)=>{

        this.SQL = `UPDATE user SET img_path = ? WHERE user_id = ?`
        db.connection.query(this.SQL,[user.img_path,user.id])
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


module.exports=userModel;



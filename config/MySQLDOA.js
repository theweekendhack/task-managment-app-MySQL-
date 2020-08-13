const mysql = require("mysql2/promise");

const mySQL =
{
    connection : null,
    
    init()
    {

        return new Promise ((resolve, reject)=>{

            mysql.createConnection({
                host: process.env.HOST,
                user: process.env.USER_NAME,
                password:process.env.PASSWORD,
                database: process.env.DATABASE
            })
            .then((con)=>{
                this.connection=con;
                resolve();
            })
            .catch(err=>{
                reject(err)
            })
     
        })
    
    }

}


module.exports = mySQL;
const Roles = require("../config/roles.js");
const authenticationRole = (roles)=>
{
    return (req,res,next)=>{

        let isAuthorized=false;
        roles.forEach(role => {
           
            if(req.session.user.role==role)
            {
                isAuthorized=true;
            }
        });

        if(isAuthorized)
        {
            next()
        }

        else
        {
          console.log("error")

        }
    }
   

}


module.exports = authenticationRole;

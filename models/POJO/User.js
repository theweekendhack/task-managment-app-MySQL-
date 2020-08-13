class User 
{

    id;
    firstName;
    lastName;
    email;
    password;
    gender;
    img_path;
    isActive;
    role;
    dateCreated;
    lastModified;

    constructor(id,first_name,last_name,email,gender,img_path,isActive,role,dateCreated,lastModified)
    {
        this.id=id;
        this.firstName=first_name;
        this.lastName=last_name;
        this.email=email;
        this.gender=gender;
        this.img_path=img_path;
        this.role=role;
        this.dateCreated=dateCreated;
        this.isActive=isActive;
        this.lastModified=lastModified;
    }

}

module.exports = User;
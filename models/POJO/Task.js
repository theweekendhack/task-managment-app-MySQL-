class Task 
{

    id;
    title;
    description;
    user;
    dateCreated;
    lastModified;

    constructor(id,title,description,user)
    {
        this.id=id;
        this.title=title;
        this.description=description;
        this.user=user;
    }

}

module.exports = Task;
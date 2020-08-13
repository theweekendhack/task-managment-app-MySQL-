exports.getAndPutMetthodProcessing = (req,res,next)=>{


    if(req.query.method =="delete")
    {
        req.method = "DELETE"
    }

    else if(req.query.method=="put")
    {
        req.method = "PUT"
    }

    next();

};
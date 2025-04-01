export function AsyncHandler(handlerFunc){
    return async(req,res,next)=>{
        try{
            await handlerFunc(req,res,next);
        }catch(err){
            next(err);
        }
    }
}
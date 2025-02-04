import { verifyToken } from "../utils/jwt"

const checkAuth =async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        

    if(!token){
        return res
        .status(401)
        .json({
            message:"Access Denied"
        })
    }

    const tokenValid = verifyToken(token)

    if(!tokenValid){
        return res
        .status(403)
        .json({
            message:"Invalid Token"
        })
    }
  
    // Attach the decoded user information (userId) to the request object
    req.user = tokenValid;  // This could contain all user info from the token

    next()


    }
    catch(error){
        return res
        .status(500)
        .json({
            error:error.message
        })
    }
}

export default checkAuth
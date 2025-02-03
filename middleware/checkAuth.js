import { verifyToken } from "../utils/jwt"

const checkAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization

        if(!token){
            return res
            .status(401)
            .json({
                message: "Access Denid"
            })
        }

        const tokenValid = verifyToken(token)

        if(!tokenValid){
            return res
            .status(403)
            .json({
                message: "Invalid token"
            })
        }
        req.user = tokenValid
        next()
    }
    catch(error){
        return res
        .status
        .json({
            error: error.message
        })
    }
}

export {checkAuth}
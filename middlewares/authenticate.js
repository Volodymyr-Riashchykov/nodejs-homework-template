const jwt = require("jsonwebtoken");
const User = require("../models/users");

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next)=> {
    try {
        const {authorization} = req.headers;
        if(!authorization){
            // 
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: `Email or password is wrong`,
                data: 'Email or password is wrong',
            
            })
        }
        const [bearer, token] = authorization.split(" ");
        if(bearer !== "Bearer"){
            // 
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: `Email or password is wrong`,
                data: 'Email or password is wrong',
            
            })
        }

        jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({token});
        if(!user || !user.token){
            // 
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: `Not authorized`,
                data: 'Email or password is wrong',
            
            })
        }
        req.user = user;
        next();

    } catch (error) {
        if(!error.status){
            error.status = 401;
            error.message = "Not authorized"
        }
        next(error);
    }

    
}

module.exports = authenticate;
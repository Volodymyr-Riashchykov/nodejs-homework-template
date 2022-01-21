const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");

const {SECRET_KEY} = process.env;

// router.post("/signin")
const authLogin =  async(req, res, next)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user || !user.verify) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: `Email or verify is wrong`,
                data: 'Email or verify is wrong',
            
            })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
             return res.status(401).json({
                status: 'error',
                code: 401,
                message: `Password is wrong`,
                data: 'Password is wrong',
            
            })
        }
        
        const {_id, name} = user;
        const payload = {
            id: _id
        };
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "8h"});
        await User.findByIdAndUpdate(_id, {token});
        res.json({
            token,
            user: {
                email,
                name
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authLogin
}

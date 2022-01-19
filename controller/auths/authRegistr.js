const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const gravatar = require("gravatar");

const authRegistr = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({
                status: 'error',
                code: 409,
                message: `Email: ${email} already exist`,
                data: 'User already exist',
            })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarUrl = gravatar.url(email);
        const newUser = await User.create({name, email, password: hashPassword, avatarUrl});
        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
                avatarUrl: newUser.avatarUrl,
            }
        })
    } catch (error) {

        next(error);
    }
};

module.exports = {
    authRegistr
}
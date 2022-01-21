const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers/sendEmail")

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
        const verificationToken = nanoid();
        // const newUser = new User({name, email, verificationToken});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarUrl = gravatar.url(email);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            avatarUrl,
            verificationToken
        });
        
        const mail = {
            to: email,
            subject: "Подтверждения email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
        };
        
        await sendEmail(mail);


        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
                avatarUrl: newUser.avatarUrl,
                verificationToken,
            }
        })
    } catch (error) {

        next(error);
    }
};

module.exports = {
    authRegistr
}
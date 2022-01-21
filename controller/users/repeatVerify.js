const User = require("../../models/users");
const sendEmail = require("../../helpers/sendEmail");

const repeatVerify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            // throw NotFound();
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "missing required field email",
            });
        }
        if (user.verify) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Verification has already been passed",
            });
        }
        // await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
        const mail = {
            to: email,
            subject: "Подтверждения email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Подтвердить email</a>`
        };
        
        await sendEmail(mail);

        res.json({
            message: "Repeated verification"
        })
    }
    catch (err) {
        next(err)
    }
    
}

module.exports = { repeatVerify };
const User = require("../../models/users");

const userVerify = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({verificationToken});
        if(!user){
            throw NotFound();
        }
        await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});

        res.json({
            message: "Verify success"
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = { userVerify };

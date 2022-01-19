const User = require("../../models/users");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res)=> {
    const { path: tempUpload, originalname } = req.file;
    
    const {_id: id} = req.user;
    const imageName =  `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        Jimp.read(resultUpload, function (err, data) {
            if (err) throw err;
            data.resize(250, 250)           
                .quality(60)      
                .write(resultUpload); 
        });
        const avatarURL = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, {avatarUrl: avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

module.exports = { updateAvatar };

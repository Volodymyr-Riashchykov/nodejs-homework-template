const User = require("../../models/users");

const userLogout =async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    res.status(204).send();
}

module.exports = {
    userLogout
}
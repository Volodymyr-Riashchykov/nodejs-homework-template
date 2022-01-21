const { userLogin } = require('./userLogin')
const { userLogout } = require('./userLogout')
const { updateAvatar } = require('./userUpdateAvatar')
const { userVerify } = require('./userVerify')
const {repeatVerify} = require('./repeatVerify')

module.exports = {
    userLogin,
    userLogout,
    updateAvatar,
    userVerify,
    repeatVerify,
}
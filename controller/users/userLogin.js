
const userLogin = (req, res) => {
    const {name, email} = req.user;
    res.json({
        user: {
            name,
            email
        }
    })
}

module.exports = {
    userLogin
}
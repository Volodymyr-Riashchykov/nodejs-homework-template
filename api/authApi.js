const express = require('express')
// const bcrypt = require("bcryptjs");
const router = express.Router()
const {ctrlAuth,ctrlUser} = require('../controller')
const {validation,authRegistrSchema,authLoginSchema} = require('../validations/contact')
const authenticate = require('../middlewares/authenticate')

router.post('/signup', validation(authRegistrSchema), ctrlAuth.authRegistr)

router.post('/login', validation(authLoginSchema), ctrlAuth.authLogin)

router.get('/current', authenticate, ctrlUser.userLogin)

router.get('/logout', authenticate, ctrlUser.userLogout)

// router.patch('/', ctrlContact.remove)

module.exports = router
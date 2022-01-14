const express = require('express')
const router = express.Router()
const {ctrlContact} = require('../controller')
const {validation,postSchema,patchSchema} = require('../validations/contact')

router.get('/contacts', ctrlContact.get)

router.get('/contacts/:id', ctrlContact.getById)

router.post('/contacts', validation(postSchema), ctrlContact.create)

router.put('/contacts/:id', validation(postSchema), ctrlContact.update)

router.patch('/contacts/:id/favorite', validation(patchSchema), ctrlContact.patch)

router.delete('/contacts/:id', ctrlContact.remove)

module.exports = router
const express = require('express')
const router = express.Router()
const {ctrlContact} = require('../controller')
const { validation, postSchema, patchSchema } = require('../validations/contact');
const authenticate = require('../middlewares/authenticate')

router.get('/', authenticate, ctrlContact.get)

router.get('/:id', authenticate, ctrlContact.getById)

router.post('/', authenticate, validation(postSchema), ctrlContact.create)

router.put('/:id', authenticate, validation(postSchema), ctrlContact.update)

router.patch('/:id/favorite', authenticate, validation(patchSchema), ctrlContact.patch)

router.delete('/:id', authenticate, ctrlContact.remove)

module.exports = router
const express = require('express')
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model/index');
const {postMiddleware} = require('../../middlewares/validationMiddleware')

router.get('/', async (req, res, next) => {
  res.json(await listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  try {
  res.json(await getContactById(req.params.contactId));
  }
  catch(error) {
    next(error);
  }
  
})

router.post('/', postMiddleware, async (req, res, next) => {
  try {
  res.status(201).json(await addContact(req.body))
  } catch (error) {
    next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
  res.json(await removeContact(req.params.contactId))
  } catch (error) {
     next(error);
  }
  
})

router.put('/:contactId', postMiddleware, async (req, res, next) => {
  try {
  res.json(await updateContact(req.params.contactId,req.body))
  } catch (error) {
    next(error);
  }
  
})

module.exports = router
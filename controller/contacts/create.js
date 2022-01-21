const Contact = require('../../models/contacts')


const create = async (req, res, next) => {

  try {
    const newProduct = {...req.body, owner: req.user._id};
    const result = await Contact.create( newProduct )

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (e) {
    // console.error(e)
    next(e)
  }
}

module.exports = create;
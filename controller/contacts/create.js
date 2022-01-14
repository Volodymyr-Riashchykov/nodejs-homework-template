const Contact = require('../../models/contacts')


const create = async (req, res, next) => {
//   const { body } = req.body
  try {
    const result = await Contact.create( req.body )

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = create;
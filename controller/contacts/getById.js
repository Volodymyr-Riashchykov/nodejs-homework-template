const Contact = require('../../models/contacts')


const getById = async (req, res, next) => {
  const { id } = req.params
  try {
      const result = await Contact.findOne({_id:id});
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    // console.error(e)
    next(e)
  }
}

module.exports = getById;
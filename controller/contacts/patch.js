const Contact = require('../../models/contacts')


const patch = async (req, res, next) => {
  const { id } = req.params
  const { favorite = false } = req.body

  try {
    const result = await Contact.findByIdAndUpdate({_id:id}, { favorite }, { new: true })
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
    console.error(e)
    next(e)
  }
}

module.exports = patch;
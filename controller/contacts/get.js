const Contact = require('../../models/contacts')


const get = async (req, res, next) => {
  try {
      const results = await Contact.find({});
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    }) 
  } catch (e) {
    // console.error(e)
    next(e)
  }
}

module.exports = get;

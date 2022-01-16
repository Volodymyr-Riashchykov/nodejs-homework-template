const Contact = require('../../models/contacts')


const get = async (req, res, next) => {
  try {
    const {page, limit, favorite} = req.query;
    const {_id} = req.user;
    let results
    if (favorite) {
      results = await Contact.find({  owner: _id, favorite: favorite });
    }
    else if (!page || !limit) {
      results = await Contact.find({ owner: _id });
    }
    else {
      const skip = (page - 1) * limit;
      results = await Contact.find({ owner: _id } 
        ,"_id name price location owner",
        {skip, limit: Number(limit)}).populate("owner", "_id email");}
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

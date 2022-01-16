const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const {contactApi} = require('./api')
const { authApi } = require('./api')

const app = express()

// parse application/json
app.use(express.json())
// cors
app.use(cors())

app.use('/api/users', authApi)
app.use('/api/contacts', contactApi)

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  // console.log(err.status)
  if (err.status === 400) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: err.message,
    })
  }
  else
    res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
      console.log(`Server not running. Error message: ${err.message}`)
        process.exit(1);
  },
  )
// const { DB_HOST, PORT = 3000 } = process.env;
// console.log(DB_HOST);
// mongoose.connect(DB_HOST)
//   .then(()=>{app.listen(PORT, () => {
//     console.log(`Server running. Use our API on port: ${PORT}`)
//     console.log('Database connection successful');
//   });
//   })
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   })
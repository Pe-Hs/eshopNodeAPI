
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/img')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })

  const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/boletaCompras')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })

  const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.png`)
    }
  })
  
  const upload = multer({ storage: storage })

  const upload2 = multer({ storage: storage2 })

  const upload3 = multer({ storage: storage3 })

  module.exports = {
    upload,
    upload2,
    upload3
  }
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/DP')
      
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + '--' + file.originalname)
    }
  })
  
  const DPupload = multer({ storage: storage })

  module.exports = DPupload
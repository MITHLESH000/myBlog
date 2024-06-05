// // src/middlewares/multerConfig.js
// const multer = require('multer');
// const path = require('path');

// // Configure Multer storage and file naming
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log(`mullter path:-${__dirname}`);
//     cb(null, path.join(__dirname, '../public/uploads'));

//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter to only accept certain file types
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file format'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// module.exports = upload;




// src/middlewares/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created directory: ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`Multer destination path: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log(`Multer filename: ${uniqueName}`);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;

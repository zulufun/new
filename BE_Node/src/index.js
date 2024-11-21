const express = require('express')
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()

const app = express();
const port = process.env.PORT || 8000; // Mặc định cổng là 8000 nếu không có PORT trong .env

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
routes(app)

// Cấu hình lưu trữ của Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Định nghĩa thư mục lưu trữ tệp tải lên
    cb(null, process.env.UPLOADS_FOLDER || path.join(__dirname, 'uploads')); // Sử dụng đường dẫn mặc định nếu không có trong .env
  },
  filename: function (req, file, cb) {
    // Đặt tên tệp sao cho duy nhất
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Khởi tạo Multer với cấu hình đã định nghĩa
const upload = multer({ storage: storage });

// Endpoint để tải lên tệp

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  // Trả về đường dẫn tệp đã tải lên
  res.send({ path: `${file.filename}` });
});

app.use('/uploads', express.static(process.env.UPLOADS_FOLDER || path.join(__dirname, 'uploads'))); // Sử dụng đường dẫn mặc định nếu không có trong .env

// // Cấu hình kết nối MongoDB
// const connectString = `mongodb://${process.env.MONGODB_HOST || 'localhost'}:${process.env.MONGODB_PORT || '27017'}/${process.env.MONGODB_DATABASE || 'test'}`;
// mongoose.connect(connectString)
//   .then(() => {
//     console.log('Connect success');
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//cấu hình l
const connectString = `mongodb://${process.env.MONGODB_HOST || 'mongo'}:${process.env.MONGODB_PORT || '27017'}/${process.env.MONGODB_DATABASE || 'test'}`;
mongoose.connect(connectString)
  .then(() => {
    console.log('Connect success');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

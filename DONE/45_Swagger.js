
// Swagger là một bộ công cụ mã nguồn mở để xây dựng OpenAPI specifications giúp chúng ta có thể thiết kế, 
// xây dựng tài liệu và sử dụng REST APIs.
// Swagger cung cấp 3 tools chính cho các developers :

// Swagger-Editor : dùng để design lên các APIs hoàn toàn mới hoặc edit lại các APIs có sẵn thông qua 1 file config.
// Swagger-Codegen : dùng để generate ra code từ các file config có sẵn
// Swagger-UI : dùng để generate ra file html,css,… từ 1 file config.
const express = require('express');
const mysql = require('mysql2');
const basicAuth = require('express-basic-auth');
const { swaggerUi, specs } = require('./src/config/swagger');
const Router = require('./src/routes/API')

const app = express();

// Cấu hình cơ sở dữ liệu MySQL
const dbMysqlWorkbench = {
  host: 'localhost',
  user: 'root',
  password: '27052003',
  database: 'hotel_booking_system',
};

// Hàm để xử lý kết nối cơ sở dữ liệu với retry
let connection;
const connectWithRetry = () => {
  connection = mysql.createConnection(dbMysqlWorkbench);

  connection.connect(err => {
    if (err) {
      console.error('Lỗi kết nối MySQL:', err);
      // Thử kết nối lại sau 5 giây
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Đã kết nối MySQL');
    }
  });

  connection.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Kết nối lại khi mất kết nối
      connectWithRetry();
    } else {
      throw err;
    }
  });
};

connectWithRetry();

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A list of users
 */

/**
 * @swagger
 * /getUserInfo:
 *   get:
 *     summary: Retrieve user information
 *     parameters:
 *       - in: query
 *         name: id_users
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User information
 */


/**
 * @swagger
 * /getBookedRooms:
 *   get:
 *     summary: Retrieve booked rooms
 *     parameters:
 *       - in: query
 *         name: id_users
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of booked rooms
 */


/**
 * @swagger
 * /getRoomByBooking:
 *   get:
 *     summary: Retrieve room by booking
 *     parameters:
 *       - in: query
 *         name: id_reservations
 *         required: true
 *         description: Reservation ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room details
 */

/**
 * @swagger
 * /getUserReviews:
 *   get:
 *     summary: Retrieve user reviews
 *     parameters:
 *       - in: query
 *         name: id_users
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user reviews
 */

app.use('/',Router);



const swaggerAuth = basicAuth({
  users: { 'admin': '1' }, 
  challenge: true,
});

app.use('/docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});

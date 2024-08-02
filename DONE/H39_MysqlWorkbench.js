const express = require('express');
const mysql = require('mysql2');

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
app.get('/getAll', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(results);
  });
});
// API Xem thông tin cá nhân
app.get('/getUserInfo', (req, res) => {
  // const userId = req.query.id_users;

  // connection.query('SELECT name, phone, address, email FROM users WHERE id_users = ?', [userId], (err, results) => {
    connection.query('SELECT name, phone, address, email FROM users WHERE id_users = 1', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(results[0]);
  });
});
//API Danh sách các phòng đã được booking
app.get('/getBookedRooms', (req, res) => {
  const userId = req.query.id_users;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  connection.query(
    `SELECT r.name, r.type, r.status, r.price, r.floor 
     FROM rooms AS r
     LEFT JOIN reservations AS re ON r.id_rooms = re.id_rooms
     WHERE re.id_users = ?
     ORDER BY re.reservation_date DESC
     LIMIT ? OFFSET ?`,
    [userId, limit, offset],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(results);
    }
  );
});
//API Xem phòng đã đặt theo booking
app.get('/getRoomByBooking', (req, res) => {
  const reservationId = req.query.id_reservations;

  connection.query(
    `SELECT r.name, r.type, r.status, r.price, r.floor
     FROM rooms AS r
     JOIN reservations AS re ON r.id_rooms = re.id_rooms
     WHERE re.id_reservations = ?`,
    [reservationId],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(results[0]);
    }
  );
});
//API Xem các đánh giá của mình
app.get('/getUserReviews', (req, res) => {
  const userId = req.query.id_users;

  connection.query(
    `SELECT h.name, h.address, e.feedback, e.star
     FROM hotels AS h
     JOIN evaluates AS e ON h.id_hotels = e.id_hotels
     WHERE e.id_users = ?`,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(results);
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});

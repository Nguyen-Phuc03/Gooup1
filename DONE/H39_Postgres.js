const express = require('express');
const { Client } = require('pg');

const app = express();

// Cấu hình kết nối PostgreSQL
const dbConfig = {
  host: 'localhost',
  user: 'postgres',
  password: '27052003',
  database: 'postgres',
  port: 5432, 
};

// Tạo kết nối
let client;
const connectWithRetry = () => {
  client = new Client(dbConfig);

  client.connect(err => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
       // Thử kết nối lại sau 5 giây
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to PostgreSQL');
    }
  });

  client.on('error', err => {
    if (err.code === 'ECONNRESET' || err.code === 'ECONNREFUSED') {
      connectWithRetry();
    } else {
      throw err;
    }
  });
};

connectWithRetry();

app.get('/getAllUser', (req, res) => {
  client.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(results.rows);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});

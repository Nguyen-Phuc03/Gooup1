// 1. Express Framework
// Express là một framework web nhẹ và mạnh mẽ được xây dựng trên nền tảng Node.js. Nó cung cấp một bộ công cụ toàn 
// diện để phát triển các ứng dụng web và API nhanh chóng, dễ dàng.

// 2. Tìm hiểu về Express Routing
// Routing là quá trình quyết định cách ứng dụng phản hồi lại các yêu cầu client tại một URL cụ thể. 
//Trong Express, có thể sử dụng phương thức app.get(), app.post(), app.put(), app.delete(), và các phương thức HTTP khác để xác
// định các tuyến đường (routes).

// 3. Middleware trong Express
// Middleware là các hàm có quyền truy cập vào đối tượng request (req), đối tượng response (res), và hàm next trong chu kỳ yêu cầu/đáp ứng của ứng dụng. 
//Middleware có thể thực hiện các nhiệm vụ như:
// Thực hiện bất cứ đoạn code nào
// Thay đổi các đối tượng request và response
// Kết thúc một quá trình request-response
// Gọi hàm middleware tiếp theo trong stack
const express = require('express');
const app = express();
//b1 tạo middleware
const logMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
//b2 sử dụng middleware
app.use(logMiddleware);

//b3 tạo route đơn giản trả về Hello world
app.get('/', (req, res) => {
  res.send('Hello world');
});

// b4 mở server với cổng 3000 
const port = 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});

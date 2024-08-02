// Tệp .sh là tệp shell script, được sử dụng để thực hiện các lệnh trong 
// terminal trên hệ điều hành Unix-like như Linux và macOS. Để tạo một tệp shell script giúp clone nội dung từ .env.dev sang .
// env với các biến như NODE_ENV, MONGO_URI, APP_NAME, và PORT


const PORT = process.env.PORT|| 5000;
console.log(`THIS IS THE ${PORT}`)

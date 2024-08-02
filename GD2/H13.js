
const fileNames = [
    'Gooup1_User_Tracking_121220230405.txt',
    'Gooup1_User_Tracking_290220230405.txt',
    'Gooup1_User_Tracking_29022023040506.txt',
    'Gooup1_User_Tracking_290220230450.txt',
    'Gooup1_User_Tracking_290220234050.txt',
    'Gooup1_User_Tracking_290220234050.txt',
    'Gooup1_User_Tracking_290020232323.txt',
    'Gooup1_UserTracking_290020232323.txt',
    'Gooup1_User_Tracking_291220232323.txts',
  ]
  const fs = require('fs');
  const path = require('path');
const directory = path.join(__dirname, 'my-data');
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}
fileNames.forEach(fileName => {
  const filePath = path.join(directory, fileName);
  fs.writeFileSync(filePath, fileName);
});

// kiểm tra định dạng tên file
const regex = /^Gooup1_User_Tracking_(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(19|20)\d{2}([01][0-9]|2[0-3])[0-5][0-9]\.txt$/;
fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (regex.test(file)) {
      const filePath = path.join(directory, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const newData = data + '-OK';
        fs.writeFile(filePath, newData, 'utf8', (err) => {
          if (err) throw err;
          console.log(`Đã cập nhật file: ${file}`);
        });
      });
    }
  });
});

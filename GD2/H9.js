//  const fs = require('fs');
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// const date = new Date();
// const fileName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.js`;
// function fetchData() {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://dummyjson.com/carts', true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       const data = JSON.parse(xhr.responseText);
//       fs.writeFileSync(fileName, JSON.stringify(data,null,2));
//       console.log(`Data saved to ${fileName}`);
//     }
//   };
//   xhr.send();
// }

// fetchData();



//  const fs = require('fs');

// const date = new Date();
// const fileName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.js`;

// async function fetchData() {
//   try {
//     const fetch = (await import('node-fetch')).default;
//     const response = await fetch('https://dummyjson.com/carts');
//     const data = await response.json();
//     fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
//     console.log(`Data saved to ${fileName}`);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// fetchData();


//axios


const axios = require('axios');

const date = new Date();
const fileName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.js`;
async function fetchData() {
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    const data = response.data;
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${fileName}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

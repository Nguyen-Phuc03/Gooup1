const user = {
  name: 'Phuc',
  age: 22,
  email: 'nphuc305072@gmail.com'
};
const {name, age, email } = user;
console.log(name); 
console.log(age);  
console.log(email);


function logger(...messages) {
  console.log(messages.join(' | '));
}
logger('Error', 'Warning', 'Info');


async function fetchProducts() {

  try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }
async function displayProducts() {
    const products = await fetchProducts();
    setTimeout(()=>{
      if (products) {
        console.log('fetch data successfully');
      } else {
        console.log('fetch data failed');
      }
    },3000);
    
  }

  displayProducts();
  

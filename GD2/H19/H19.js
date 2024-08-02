
const user = {
    firstName: 'Nguyễn',
    lastName: 'Phúc',
    age: 21,
  };
  const address = {
    street: '906/31 tôn đức thắng',
    city: 'đà nẵng ',
    country: 'Việt Nam',
  };
  
  const result = {
    ...user, 
   ...address , 
  };
  console.log(result);
  const person = {
    name: 'doc',
    age: 30,
    sex: 'male',
    address: null,
    country: undefined,
  };

const objectentries = Object.entries(person).filter(([key, value]) => value !== null && value !== undefined& key !== null && key !== undefined);
console.log(objectentries);

class Animal {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }
  class Dog extends Animal {
    constructor(name, age, breed) {
      super(name, age);
      this.breed = breed;
    }
    getBreed() {
      return this.breed;
    }
    setBreed(newBreed) {
      this.breed = newBreed;
    }
  }
  // const animal1 = new Animal('Tommy', 5);
  // console.log(animal1); 

  // const dog1 = new Dog('Buddy', 3, 'Golden Retriever');
  // console.log(dog1); 

  import add1 from './add.js';
  import divi from './divi.js';
  import sub from './sub.js';
  import mul from './mul.js';


  function main(){
    console.log(add1(1,2));
    console.log(sub(1,2)); 
    console.log(mul(1,2));
    console.log(divi(1,2));


    console.log(add1(0.1,0.2));
    console.log('sử dụng toprecision(cộng):')
    console.log(add1(0.1,0.2).toPrecision(1));
    console.log('sử dụng toFixed: ');
    console.log(add1(0.1,0.2).toFixed(1));
    console.log(mul(0.1,0.2));
    console.log('sử dụng toprecision(nhân):')
    console.log(mul(0.1,0.2).toPrecision(1));
    console.log('sử dụng toFixed: ');
    console.log(mul(0.1,0.2).toFixed(2));
  }
main();
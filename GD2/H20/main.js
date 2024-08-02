import { hotels as myHotel, misc, promotionPercentCalc} from './hotel.js';

myHotel.forEach(hotel => {
  const randomEmoji = misc.emojis[Math.floor(Math.random() * misc.emojis.length)];
  hotel.emoji = randomEmoji;
});
myHotel.forEach(hotel => {
  const price = hotel.price.replace('$', '').replace(',', '');
  const promotionPrice = hotel.promotionPrice.replace('$', '').replace(',', '');
  const discount = promotionPercentCalc(price, promotionPrice);
  hotel.promotionPrice = discount; 
});


const bestPriceHotel = myHotel.reduce((min, hotel) => 
  hotel.promotionPrice < min.promotionPrice ? hotel : min
);

const chepes=myHotel.reduce((min,hotel)=>
  hotel.promotionPrice<min.promotionPrice ? hotel:min
);

const lowestCleanFeeHotel = myHotel.reduce((min, hotel) => 
  hotel.cleaningFee <min.cleaningFee ? hotel : min
);


myHotel.forEach(hotel => {
  hotel.tags = [];
  if (hotel === chepes) hotel.tags.push('cheapest');
  if (hotel === bestPriceHotel) hotel.tags.push('best-price');
  if (hotel === lowestCleanFeeHotel) hotel.tags.push('lowest-clean-fee');
});
console.log(myHotel);

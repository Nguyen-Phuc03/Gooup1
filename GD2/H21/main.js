import { store } from './store.js';

const Specificationsid1 = store.products[0]?.details?.specifications;
if (Specificationsid1) {
  console.log(Specificationsid1);
} else {
  console.log("specifications can not be found");
}



const Priceid3 = store.products[2]?.getPrice?.();
if (Priceid3) {
  console.log(`Giá của sản phẩm: ${Priceid3}`);
} else {
  console.log("Không có thông tin giá.");
}

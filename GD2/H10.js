const { v4: uuidv4 } = require('uuid');

let orderIdSet = new Set();
let orderDetailsMap = new Map();

function addOrder(products) {
    if (products.length === 0) {
        console.log('Phải có ít nhất một sản phẩm.');
        return;
    }
    const orderId = uuidv4();
    orderIdSet.add(orderId);
    orderDetailsMap.set(orderId, products);
    console.log(`Order mới với ID: ${orderId} đã được thêm.`);
}
function updateOrder(orderId,products){
    if(!orderDetailsMap.has(orderId)){
        console.log('orderId không tồn tại ')
        return;
    }
    if(products.every(product=>product.productQuantity===0)){
        deleteOrder(orderId);
        console.log(`orderId với Id :${orderId} đã bị xóa do không có sản phẩm nào số lượng lớn hơn 0. `);

    }
    else{
        orderDetailsMap.set(orderId,products);
        console.log(`Order với ID: ${orderId} đã được cập nhật.`);
    }
}
function deleteOrder(orderId) {
    if (!orderDetailsMap.has(orderId)) {
        console.log('Order ID không tồn tại.');
        return;
    }
    orderIdSet.delete(orderId);
    orderDetailsMap.delete(orderId);
    console.log(`Order với ID: ${orderId} đã bị xoá.`);
}

function findOrder() {
    let maxTotalValue = 0;
    let highestValueOrderId = null;
    for (let [orderId, products] of orderDetailsMap.entries()) {
        let totalValue = products.reduce((sum, product) => sum + (product.price * product.productQuantity), 0);
        if (totalValue > maxTotalValue) {
            maxTotalValue = totalValue;
            highestValueOrderId = orderId;
        }
    }
    return highestValueOrderId;
}
function printOrder() {
    let highestValueOrderId = findOrder();
    if (highestValueOrderId) {
        console.log(`Order ID có tổng giá trị lớn nhất: ${highestValueOrderId}`);
    } else {
        console.log('Không có order nào.');
    }
}
function printOrderIds() {
    console.log("Danh sách orderId:");
    for (let orderId of orderIdSet) {
        console.log(orderId);
    }
}

const products1 = [
    { productId: 'p1', productQuantity: 2, productName: 'Product 1', price: 100 },
    { productId: 'p2', productQuantity: 1, productName: 'Product 2', price: 200 }
];
const products2 = [
    { productId: 'p3', productQuantity: 3, productName: 'Product 3', price: 50 },
    { productId: 'p4', productQuantity: 1, productName: 'Product 4', price: 150 }
];
addOrder(products1);
addOrder(products2);

updateOrder(Array.from(orderIdSet)[0], [
    { productId: 'p1', productQuantity: 0, productName: 'Product 1', price: 100 },
    { productId: 'p2', productQuantity: 0, productName: 'Product 2', price: 200 }
]);
updateOrder(Array.from(orderIdSet)[0], [
    { productId: 'p3', productQuantity: 3, productName: 'Product 3', price: 50 },
    { productId: 'p4', productQuantity: 0, productName: 'Product 4', price: 150 }
]);

printOrder();
printOrderIds();

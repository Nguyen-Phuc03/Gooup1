function demoPromise(delaySecond) {
    return new Promise((resolve, reject) => {
        const randomnumber = Math.floor(Math.random() * 10);
        setTimeout(() => {
            if (randomnumber >= 5) {
                resolve(true);
            } else {
                reject(false);
            }
        }, delaySecond * 1000);
    });
}
// Sử dụng Promise.all với hai hàm demoPromise
Promise.all([demoPromise(1), demoPromise(2)])
    .then((results) => {
        console.log("Promise.all ,resolve: ", results);
    })
    .catch((error) => {
        console.log("Promise.all ,reject: ", error);
    });


// Sử dụng Promise.allSettled với hai hàm demoPromise
Promise.allSettled([demoPromise(2), demoPromise(3)])
    .then((results) => {
        console.log('Promise.allSettled:', results);
    });


    
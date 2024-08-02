function demoPromise(){
    return new Promise((resolve,rejects)=>{
        const randomnumber=Math.floor(Math.random()*10);
        if(randomnumber>=5){
            resolve(true);
        } else {
            rejects(false);
        }
    });
}
Promise.all ([demoPromise(),demoPromise()])
    .then((result) => {
    console.log( result);
    })
    .catch((error) => {
    console.log( error);
});

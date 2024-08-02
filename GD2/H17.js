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
const ids = Array.from({ length: 20 }, (_, index) => index + 1);
const promises = ids.map(demoPromise);
//sử dụng for..of
// async function promise(){
//     for(const promise of promises){
//       try{
//         const result=await promise;
//         console.log('resolve',result);
//       }
//       catch(error){
//         console.error('rejects',error);
//       }
//     }
// }
// promise();
//sử dụng Promise.all
Promise.all(promises)
.then(result=>{
    console.log(result);
})
.catch(error=>{
    console.log(error);
})



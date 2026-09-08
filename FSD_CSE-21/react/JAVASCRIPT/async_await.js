function f1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("hello student");
            resolve();
        }, 4000);
    });
}

function f2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("welcome to ABES");
            resolve();
        }, 1000);
    });
}
function f(){
    return new Promise((resolve, reject) => {
})
}
async function test(){
    try{
    await f1();
    await f2();
    }
    catch(err){
        console.log(err);
    }
}
test();
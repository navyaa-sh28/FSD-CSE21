function f1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("hi");
            resolve();
        }, 4000);
    });
}

function f2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("hello");
            resolve();
        }, 1000);
    });
}
f1().then(f2)
.catch((err)=>{
    console.log("ERROR", err);
});
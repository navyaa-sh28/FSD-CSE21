function sum(a,b){
    return a+b;
}

function sumWithMsg(clbk,msg){
    const result=clbk(20,30);
    const fresult="HI"+msg+"your result is "+result;
    console.log(fresult);
}
sumWithMsg(sum," Navya ");
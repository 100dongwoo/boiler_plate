if(process.env.NODE_ENV==='production'){
    module.exports=require('/prod');
}
else{
    module.exports=require('./dev')
}

//배포되고 안되고 에따라서 실해완경을 바꿈
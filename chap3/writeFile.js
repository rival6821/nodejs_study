const fs = require('fs');

fs.writeFile('./writefile.txt', '글을 입력합니다.' ,(err)=>{
    if(err){
        throw err;
    }else{
        fs.readFile('./writefile.txt',(err,data)=>{
            if(err){
                throw err;
            }else{
                console.log(data.toString());
            }
        })
    }
})
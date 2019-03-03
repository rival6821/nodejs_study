const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        if(precess.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true);
        }
        mongoose.connect('mongoose://root:aa8810@localhost:27017/admin',{
            dbName : 'nodejs',
        }, (error) => {
            if(error){
                console.log('몽고디비 연결 에러',error);
            }else{
                console.log('몽고디비 연결 성공')
            }
        })
    }
}
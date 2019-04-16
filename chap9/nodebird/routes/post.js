const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
// uploads 폴더 확인
fs.readdir('uploads', (error)=>{
    if(error){
        console.log('uploads 폴더가 없어 uploads폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

const upload = multer({
    storage : multer.diskStorage({
        destination(req,file,cb){
            // 서버저장위치 설정
            cb(null, 'uploads/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits : { fileSize : 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req,res)=>{
    console.log(req.file);
    res.json({ 'url' : `/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res, next)=>{
    try {
        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            userId : req.user.id
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
                where : { title : tag.slice(1).toLowerCase()},
            })));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
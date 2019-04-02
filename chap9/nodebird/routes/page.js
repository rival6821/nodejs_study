const express = require('express');

const router = express.Router();

router.get('/profile', (req,res)=>{
    res.render('profile', {
        title:'내정보 - nodebird',
        user : null
    });
});

router.get('/join', (req,res)=>{
    res.render('join', {
        title:'회원가입 - nodebird', 
        user : null,
        joinError : req.flash('joinError'),
    });
});

router.get('/', (req,res)=>{
    res.render('main', {
        title:'nodebird', 
        twits : [],
        user : null,
        loginError : req.flash('loginError'),
    });
});

module.exports = router;
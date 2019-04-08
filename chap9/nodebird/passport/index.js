const local = require('./localStrategy');
const kakao = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUse((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.find({ where : {id}})
            .then(user => done(null,user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
}
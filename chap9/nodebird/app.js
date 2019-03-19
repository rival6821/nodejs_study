const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const pageRoute = require('./routes/page');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// view를 pug로
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

// 개발용 콘솔찍기
app.use(morgan('dev'));
app.use(express.static(paht.join(__dirname, 'public')));
app.use(express.json());
// urlencode
app.use(express.urlencoded({ extended : false }));
// 쿠키
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
}));
app.use(flash());

app.use('/', pageRoute);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((req,res,next)=>{
    res.locals.message = err.message;
    res.locals = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기 중');
});

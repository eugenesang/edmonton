require('dotenv').config();

const express = require('express')
const session = require('express-session')
const dbSetup = require('./models/dbSetup');
const checkLogin = require('./middleware/login')

dbSetup();

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//app.use(require('./middleware/morgan'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(checkLogin);

app.use('/home-valuation', require('./routes/homeValuation'));

app.use('/account', require('./routes/account'));

app.use('/agent', require('./routes/agent'));

app.get('/', (req, res)=>{
    res.render('index', {user: req.session.info? req.session.info: null})    
});
app.get('/og', (req, res)=>{
    res.render('index', {user: req.session.info? req.session.info: null})
})
app.get('/swift-sale', (req, res)=>{
    res.render('swift-sale', {user: req.session.info? req.session.info: null})    
})
app.get('/local-mls', (req, res)=>{
    res.render('local-mls', {user: req.session.info? req.session.info: null})
})


app.get('/why-us', (req, res)=>{
    res.render('why-us');
})
app.get('/sell-to-us', (req, res)=>{
    res.render("sell-to-us");
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}`)
} );
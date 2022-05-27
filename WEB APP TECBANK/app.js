const express = require('express');
const app = express();

const sendEmail = require('./utils/nodemailer');

const TokenGenerator = require( 'token-generator' )({
    salt: 'your secret ingredient for this magic recipe',
    timestampMap: 'abcdefghij', // 10 chars array for obfuscation proposes
});

let accounts = null;
let currtrans = null;
let currtoken = null;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');

const indicadoresEconomicosBCCR = require('indicadores-economicos-bccr');

dotenv.config({path:'./env/.env'});

app.use('/resources', express.static('public'));
app.use('/resources', express.static( __dirname + '/public'));

app.set('view engine', 'ejs');

const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

const connection = require('./database/db');
const UserController = require('./controller/user');
const AccountController = require('./controller/account');
const { response } = require('express');

const userController = new UserController();
const accountController = new AccountController();
app.get('/login', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    if(!await userController.login(req.body.user, req.body.pass)){
        res.render('index', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Usuario y/o contraseña incorrectas!",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'index'
        });
    }
    else{
        res.redirect('/mainpage');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    await userController.register(req.body.name, req.body.surname, req.body.email, req.body.ced, req.body.user, req.body.pass);
    res.redirect('/login');
});

app.get('/mainpage', async (req, res) => {
    accounts = await userController.getAccounts();
    accounts = JSON.stringify(accounts);
    res.render('mainPage', {
        some: accounts
    });
});

app.get('/transferencias', (req, res) => {
    res.render('transacciones');
});

app.get('/mainpaget', async (req, res) => {
    indicadoresEconomicosBCCR('adrivargas48@estudiantec.cr', 'AIESAAG5GI').then(data => {
        let compra = data.compra;
        let venta = data.venta;
        res.render('mainpage',{
            some: accounts,
            alert: true,
            alertTitle: "Tipo de cambio",
            alertMessage: "Compra: " + compra + " Venta: " + venta,
            alertIcon: "success",
            showConfirmButton: true,
            timer: false,
            ruta: 'mainpage'
            });
    });
});

app.get('/transintra', (req, res) => {
    res.render('transIntra');
});

app.post('/enviartokenIntra', (req, res) =>{
    let cuentaorigen = req.body.cuentaorigen;
    let cuentadestino = req.body.cuentadestino;
    let monto = req.body.monto
    currtrans = {
        cuentaorigen,
        cuentadestino,
        monto
    };
    currtoken = TokenGenerator.generate();
    let email = userController.getEmail();
    sendEmail(email, "Token transferencia TECBank" , currtoken);
    res.redirect('/tokenIntra');
});

app.get('/tokenIntra', (req,res) =>{
    res.render('tokenIntra');
});

app.post('/recibirTokenIntra', async (req, res) => {
    if(req.body.token == currtoken){
        await accountController.transIntra(currtrans.monto, currtrans.cuentadestino, currtrans.cuentaorigen);
        res.render('mainpage',{
            some: accounts,
            alert: true,
            alertTitle: "¡Exito!",
            alertMessage: "¡Transferencia realizada!",
            alertIcon: "success",
            showConfirmButton: true,
            timer: false,
            ruta: 'mainpage'
            });
    }else{
        res.render('token',{
            some: accounts,
            alert: true,
            alertTitle: "Token inválido",
            alertMessage: "Token inválido",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'token'
            });
    }
});

app.get('/transinter', (req, res) => {
    res.render('transInter');
});

app.post('/enviartokenInter', (req, res) =>{
    let cuentaorigen = req.body.cuentaorigen;
    let monto = req.body.monto
    currtrans = {
        cuentaorigen,
        monto
    };
    currtoken = TokenGenerator.generate();
    let email = userController.getEmail();
    sendEmail(email, "Token transferencia TECBank" , currtoken);
    res.redirect('/tokenInter');
});

app.get('/tokenInter', (req,res) =>{
    res.render('tokenInter',{
        some: accounts,
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Se le cobrará una comisión de $2 por una transferencia interbancaria",
        alertIcon: "warning",
        showConfirmButton: true,
        timer: false,
        ruta: 'tokenInter'
        });
});

app.post('/recibirTokenInter', async (req, res) => {
    if(req.body.token == currtoken){
        indicadoresEconomicosBCCR('adrivargas48@estudiantec.cr', 'AIESAAG5GI')
        .then( async (data) => {
            let compra = data.compra;
            await accountController.transInter(currtrans.monto, currtrans.cuentaorigen, compra);
            res.render('mainpage',{
                some: accounts,
                alert: true,
                alertTitle: "¡Exito!",
                alertMessage: "¡Transferencia realizada!",
                alertIcon: "success",
                showConfirmButton: true,
                timer: false,
                ruta: 'mainpage'
                });
        });
    }else{
        res.render('token',{
            some: accounts,
            alert: true,
            alertTitle: "Token inválido",
            alertMessage: "Token inválido",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'token'
            });
    }
});

app.listen(3000, (req, res) => {
    console.log("App listening on port: 3000");
});
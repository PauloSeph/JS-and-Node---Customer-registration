// Imports
require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes')
const path = require('path')
const {middleWareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware')

// IMPORTS de Biblioteca relacionada a session 
const session = require('express-session')
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')

// Import relecionado a bibliotecas de segurança
const helmet = require('helmet')
const csrf = require('csurf')
// Conexão com o BANCO de Dados MONGO
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conexão foi estabelicida com sucesso");
        app.emit('Pronto')
    })
    .catch(e => console.log(e))

app.use(helmet())

// Configuração do Express
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

// Configuração das Sessions
const sessionOptions = session({
    secret: 'ajaajakasjkas akaas',
    store: new mongoStore({ mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash());

// View - Template Engine
app.set('views', path.resolve(__dirname, 'src', 'views'))

app.set('view engine', 'ejs')

// Segurança do CSRF
app.use(csrf())

// Middleware Global
app.use(middleWareGlobal);
app.use(checkCsrfError)
app.use(csrfMiddleware)

// Rotas
app.use(routes)


// Servidor web Express
app.on('Pronto', () => {
    app.listen(3000, () => {
        console.log("Acessar http://localhost:3000");
    })
})




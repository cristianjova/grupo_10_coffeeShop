const express = require('express');
const methodOverride = require('method-override');
const path = require ('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('./middlewares/auth');


// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));

//configuracion template engine EJS
app.set('view engine','ejs');

//para formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Verifica si existe _method en el queryString
app.use(cors());

// Session
app.use(session({
  secret: 'coffeeshop',
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
// AuthMidleware
app.use(auth);


const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const productsRoute = require('./routes/products');

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/products', productsRoute);
//app.use('/static', staticRoute);

// Rutas API
const apiProductsRoute = require('./routes/api/product');
const apiUsersRoute = require('./routes/api/user');

app.use('/api/products', apiProductsRoute);
app.use('/api/users', apiUsersRoute);

//Dashboard route
app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Correr servidor
const PORT = process.env.PORT ? process.env.PORT : 3000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

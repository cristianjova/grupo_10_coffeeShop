const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');  
const auth = require('./middlewares/auth');


// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));

//configuracion template engine EJS
app.set('view engine','ejs');

//Session
app.use(session({
    secret: 'Logueado',
    resave: false, // no vuelve a guardar si no hay cambios
    saveUninitialized: true, // guarda sesiones aunque todavía no haya datos
}));

//Cookie
app.use(cookieParser());
app.use(auth);


//para formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // Verifica si existe _method en el queryString

const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const productsRoute = require('./routes/products');

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/products', productsRoute);
//app.use('/static', staticRoute);

// Correr servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

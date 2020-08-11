const express = require('express');

// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));
//configuracion template engine EJS
app.set('view engine','ejs');

//para formularios
app.use(express.urlencoded({ extended: false }));


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

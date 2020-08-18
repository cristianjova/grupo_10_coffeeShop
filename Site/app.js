const express = require('express');
const methodOverride = require('method-override');

// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));
//configuracion template engine EJS
app.set('view engine','ejs');

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

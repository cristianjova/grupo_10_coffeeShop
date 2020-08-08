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
const userRoute = require('./routes/register');
const productsRoute = require('./routes/products');

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/products', productsRoute);


// // Rutas - Temporales
// app.get('/', (req,res)=>{
//   res.sendFile(__dirname + '/views/index.html')
// });

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/views/login.html')
});

app.get('/login', (req,res)=>{res.sendFile(__dirname + '/views/login.html')});


//ruta a headers
app.get('/header', (req,res)=>{res.sendFile(__dirname + '/views/header.html')});
//ruta a registro
app.get('/register', (req,res)=>{res.sendFile(__dirname + '/views/register.html')});

// Correr servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

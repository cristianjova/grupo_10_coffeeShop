const express = require('express');

// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));
//configuracion template engine EJS
app.set('view engine','ejs');

//
const indexRoute = require('./routes/index');

app.use('/', indexRoute);


// // Rutas - Temporales
// app.get('/', (req,res)=>{
//   res.sendFile(__dirname + '/views/index.html')
// });

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/views/login.html')
});

app.get('/login', (req,res)=>{res.sendFile(__dirname + '/views/login.html')});

app.get('/product-detail', (req, res) => {
  res.sendFile(`${__dirname}/views/productDetail.html`);
  // Eso es igual a (__dirname + '/views/productDetail.html') a mi me parece más facil asi
  // Pero si no les gusta o no les parece usamos con el + y listo :)
});

app.get('/product-cart', (req, res) => {
  res.sendFile(__dirname + '/views/productCart.html');
});

//ruta a headers
app.get('/header', (req,res)=>{res.sendFile(__dirname + '/views/header.html')});
//ruta a registro
app.get('/register', (req,res)=>{res.sendFile(__dirname + '/views/register.html')});

// Correr servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const express = require('express');

// Iniciar app
const app = express();

// Archivos estaticos
app.use(express.static('public'));

// Rutas - Temporales
app.get('/', (req,res)=>{
  res.sendfile(__dirname + '/views/home.html')
});
app.get('/product-detail', (req, res) => {
  res.sendFile(`${__dirname}/views/productDetail.html`);
  // Eso es igual a (__dirname + '/views/productDetail.html') a mi me parece más facil asi
  // Pero si no les gusta o no les parece usamos con el + y listo :)
});

app.get('/product-cart', (req, res) => {
  res.sendFile(__dirname + '/views/productCart.html');
});

// Correr servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

const url = require('url');
// Modelos
const { product, toast, roast, size} = require('../../database/models');

module.exports = {
  index:  (req, res) => {
    let detailUrl = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    });

    product.findAndCountAll(
      {
        include: [toast, roast, size]
      }
    )
      .then( async data => {
        // Verifico que haya productos
        if(data.rows.length) {
          
          products = data.rows.map(product => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              toast: product.toast.name,
              roast: product.roast.name,
              size: product.size.name,
              price: product.price,
              detail: `${detailUrl}/${product.id}`
            }
          });
          

          let response = {
            meta: {
              count: data.count
            },
            products
          }
          response.meta.countByToast = await toast.count({
            include: product,
            group: ['name']
          });
          response.meta.countByRoast = await roast.count({
            include: product,
            group: ['name']
          });
          response.meta.countBySize = await size.count({
            include: product,
            group: ['name']
          });
        return res.send(response);
          return res.json(response);
        } else {
          return res.status(404).json( {error: 'Sin resultados'} );
        }
      })
      .catch(error =>{
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor'});
      })
  },
  detail: (req, res) => {
    product.findByPk(req.params.id, {
      include: [toast, roast, size]
    })
      .then(data => {
        let imgUrl = url.format({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: '/img/products'
        });

        // Verifico si existe el producto
        if (data) {
          return res.json({
            id: data.id,
            name: data.name,
            description: data.description,
            price: data.price,
            toast: data.toast.name,
            toast: data.toast.name,
            size: data.size.name,
            image: `${imgUrl}/${data.image}`
          })
        } else {
          return res.status(404).json( {error: 'Sin resultados'} );
        };
        
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: 'Error en el servidor'});
      });
  }
}
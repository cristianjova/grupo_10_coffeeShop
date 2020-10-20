const url = require('url');

const { user, category} = require('../../database/models');

module.exports = {
    list: (req,res)=>{
        let detailUrl = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
          });

        user.findAndCountAll({ include: category })
            .then(getUsers => {
                if(getUsers.rows.length){
                    let users = getUsers.rows.map(getU => {
                        return {
                          id: getU.id,
                          firstName: getU.first_name,
                          lastName: getU.last_name,
                          email: getU.email,
                          detail: `${detailUrl}/${getU.id}`
                        }
                      });

                    let response = {
                        meta:{
                            count: users.length,
                        },
                        users
                    }
                    console.log(response);
                    return res.json(response);
                }else{
                    return res.status(500).json({error: ' no se encuentra'})
                }
            })
            .catch(error => {
                console.log(error);
                return res.status(404).json({error:'Sin resultados!'})
            })
    },
    show: (req, res) => {
        user.findByPk(req.params.id, {
            include: [category]
          })
            .then(data => {
              let imgUrl = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: '/img/users'
              });
      
              // Verifico si existe el producto
              if (data) {
                return res.json({
                  id: data.id,
                  firstName: data.first_name,
                  lastName: data.last_name,
                  email: data.email,
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
};
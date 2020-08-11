module.exports = {
  index: {},
  detail: (req, res) => {
    res.render('products/detail');
  },
  store: (req, res) => {
    res.render('products/create');
  },
  edit: (req, res) => {
    res.render('products/edit');
  },
  cart: (req, res) => {
    res.render('products/cart');
  }
}
// controllers de index
const request = require('request');

// Definir las URLs para los ambientes de desarrollo y produccion
const apiOptions = {
  server: 'http://localhost:3000' // server local
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://hsalazar-dw3.herokuapp.com' // server remoto - produccion
};


const index = (req, res, next) => {
    res.render('index', { title: 'Mi Express' });
  }

module.exports = {
    index
}
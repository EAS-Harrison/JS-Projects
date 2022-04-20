const { response } = require('express');
var express = require('express');
var router = express.Router();
const apiHelper = require('../helpers/apiHelpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  apiHelper.callApi('http://localhost:3000/api/')
    .then(response => {
      console.log(response)
      res.render('index.hbs', { title: 'Brians Pie Shop', data: response.data });
    })
    .catch(error => {
      res.send(error)
    })
});

module.exports = router;

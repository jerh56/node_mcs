const ENV = process.env.NODE_ENV || 'develop';
const CONFIG = require('./config/'+ ENV +'.json');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var router = express.Router();

router.use(bodyParser.urlencoded({"extended":"true"}));
router.use(bodyParser.json());
router.use(require('./services/products.service.js'));
router.use('*', (req, res) => res.status(404).send('Endpoint not found.'))
app.use(router);

app.listen(CONFIG.port, () => console.log(`App listen on port ${CONFIG.port}`));

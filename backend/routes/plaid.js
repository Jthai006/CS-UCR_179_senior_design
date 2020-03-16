var express = require('express');
var router = express.Router();
const { receivePublicToken, getTransactions, getProgressTransactions } = require("./controller");

router.post('/get_access_token', receivePublicToken);
/* GET home page. */
router.post('/', getTransactions);
router.post('/progressTrans', getProgressTransactions);
module.exports = router;

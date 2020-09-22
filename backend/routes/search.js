var express = require('express');
var router = express.Router();
var { findSearch, findAllWord, addWordInSearch } = require("../controller/search");

router.get('/', findSearch);
router.get('/All', findAllWord);
router.post('/addword', addWordInSearch);

module.exports = router;

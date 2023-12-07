const express = require('express');

const router = express.Router();

router.use((req, res)=>{
    res.render('page-under-construction');
})

module.exports = router;
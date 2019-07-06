const express = require('express');
const db = require('../models');
const passport = require('../config/passportConfig');
const router = express.Router();


router.get('/settings', function(req, res) {
    db.hazard.findAll().then(function(hazards){
        res.render('hazard/settings',{hazards});
    })
  });

  router.get('/:id', function(req, res) {
    db.hazard.findOne({
        where: {id: parseInt(req.params.id)},
    }).then(function(hazard){
        res.render('hazard/show', {hazard})
    });
});

router.post('/', function(req, res) {
    db.hazard.create({
        type: req.body.hazard
    })
    res.redirect('hazard/settings')
});



module.exports = router;

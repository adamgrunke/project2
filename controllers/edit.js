const express = require('express');
const db = require('../models');
const passport = require('../config/passportConfig');
const router = express.Router();


router.get('/settings', function(req, res) {
    db.hazard.findAll().then(function(hazards){
        res.render('edit/settings',{hazards});
    })
  });

  router.get('/:id', function(req, res) {
    db.hazard.findOne({
        where: {id: parseInt(req.params.id)},
    }).then(function(hazard){
        res.render('edit/show', {hazard})
    });
});

module.exports = router;

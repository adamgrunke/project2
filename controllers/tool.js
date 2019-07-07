const express = require('express');
const db = require('../models');
const passport = require('../config/passportConfig');
const router = express.Router();


router.get('/settings', function(req, res) {
    db.tool.findAll().then(function(tools){
        res.render('tool/settings',{tools});
    })
  });

  router.get('/:id', function(req, res) {
    db.tool.findOne({
        where: {id: parseInt(req.params.id)},
    }).then(function(tool){
        res.render('tool/show', {tool})
    });
});

router.post('/', function(req, res) {
    db.tool.create({
        type: req.body.tool
    })
    res.redirect('tool/settings')
});

router.delete('/:id', function(req, res) {
  console.log("destroy: " + parseInt(req.params.id))
    db.tool.destroy({
      where: {id: parseInt(req.params.id)}
    }).then(function() {
      res.redirect('/tool/settings');
    });
  });



module.exports = router;
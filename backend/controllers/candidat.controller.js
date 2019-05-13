var Candidat = require("../models/candidat.model");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.candidat_create = function(req, res, next) {
  var product = new Candidat({
    nume: req.body.nume,
    prenume: req.body.prenume
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Candidat creat cu succes");
  });
};

exports.showAllCandidati = function(req, res) {
  Candidat.find({}).then(function(partide) {
    res.send(partide);
  });
};

exports.detalii_candidat = function(req, res, next) {
  Candidat.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.candidat_delete = function(req, res, next) {
  Candidat.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

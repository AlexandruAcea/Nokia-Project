var Candidat = require("../models/candidat.model");
var Partid = require("../models/partid.model");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.candidat_create = function(req, res, next) {
  var product = new Candidat({
    nume: req.body.nume,
    prenume: req.body.prenume,
    partid: { _id: "" }
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
  Candidat.findByIdAndRemove(req.params.id, function(err, candidat) {
    if (err) return next(err);

    //console.log(candidat);

    if (candidat.partid._id !== "")
      Partid.findById(candidat.partid._id, function(err, partid) {
        if (err) return next(err);

        var filtered = partid.membrii.filter(function(el) {
          return el._id != req.params.id;
        });

        Partid.findByIdAndUpdate(
          candidat.partid._id,
          { $set: { membrii: filtered } },
          function(err) {
            if (err) return next(err);
            res.send("Deleted successfully!");
          }
        );
      });
  });
};

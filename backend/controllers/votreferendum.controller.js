var VotReferendum = require("../models/votreferendum.model");

exports.referendumCreate = function(req, res, next) {
  var product = new VotReferendum({
    nume: req.body.nume,
    data_start: req.body.data_start,
    descriere: req.body.descriere
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Referendum creat!");
  });
};

exports.showAllReferendums = function(req, res) {
  VotReferendum.find({}).then(function(referendumuri) {
    res.send(referendumuri);
  });
};

exports.votYES = function(req, res, next) {
  VotReferendum.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    VotReferendum.findByIdAndUpdate(
      req.params.id,
      { $set: { voturi_da: ++product.voturi_da } },
      function(err, product) {
        if (err) return next(err);
        res.send("Product udpated.");
      }
    );
  });
};

exports.votNO = function(req, res, next) {
  VotReferendum.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    VotReferendum.findByIdAndUpdate(
      req.params.id,
      { $set: { voturi_nu: ++product.voturi_nu } },
      function(err, product) {
        if (err) return next(err);
        res.send("Product udpated.");
      }
    );
  });
};

exports.delete = function(req, res, next) {
  VotReferendum.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Referendum sters cu success!");
  });
};

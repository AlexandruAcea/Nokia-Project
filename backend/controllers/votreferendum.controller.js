var VotReferendum = require("../models/votreferendum.model");

exports.referendumCreate = function(req, res, next) {
  var product = new VotReferendum({
    nume: req.body.nume,
    data_start: req.body.data_start,
    descriere: req.body.descriere,
    votanti: [],
    votStatus: "none"
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

exports.startVot = function(req, res, next) {
  VotReferendum.findByIdAndUpdate(
    req.params.id,
    { $set: { votStatus: "ongoing" } },
    function(err) {
      if (err) return next(err);
      res.send("Votul a inceput!");
    }
  );
};

exports.stopVot = function(req, res, next) {
  VotReferendum.findByIdAndUpdate(
    req.params.id,
    { $set: { votStatus: "stopped" } },
    function(err) {
      if (err) return next(err);
      res.send("Votul a fost oprit!");
    }
  );
};

exports.votYES = function(req, res, next) {
  VotReferendum.findById(req.params.id, function(err, product) {
    if (err) return next(err);

    var votanti = product.votanti;
    votanti.push(req.body.id_votant);

    VotReferendum.findByIdAndUpdate(
      req.params.id,
      { $set: { voturi_da: ++product.voturi_da, votanti: votanti } },
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

    var votanti = product.votanti;
    votanti.push(req.body.id_votant);

    VotReferendum.findByIdAndUpdate(
      req.params.id,
      { $set: { voturi_nu: ++product.voturi_nu, votanti: votanti } },
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

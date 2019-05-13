var Partid = require("../models/partid.model");
var Candidat = require("../models/candidat.model");

exports.createPartid = function(req, res, next) {
  var product = new Partid({
    nume: req.body.nume,
    abreviere: req.body.abreviere,
    descriere: req.body.descriere,
    membrii: []
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Partid creat, adauga membrii!");
  });
};

exports.showAllPartide = function(req, res) {
  Partid.find({}).then(function(partide) {
    res.send(partide);
  });
};

exports.deletePartid = function(req, res, next) {
  Partid.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Partid sters cu success!");
  });
};

exports.addMembru = function(req, res, next) {
  //cautam Partidul dupa ID
  Partid.findById(req.params.id, function(err, partid) {
    if (err) return next(err);
    //init array cu candidatii existenti
    var arr = partid.membrii;

    //daca partidul exista, cautam candidatul pe care vrem sa-l adaugam in baza de date
    Candidat.findById(req.body.id_candidat, function(err, candidat) {
      if (err) {
        res.send("Candidatul nu exista :(");
        return next(err);
      }

      //verifica daca candidatul nu exista cumva deja in partid
      var check = false;

      partid.membrii.forEach(function(entry) {
        if (entry._id == req.body.id_candidat) check = true;
      });

      if (check) {
        res.send("Candidatul exista deja in partid");
        return next(err);
      } else {
        //adaugam in array candidatul dorit
        arr.push(candidat);

        Partid.findByIdAndUpdate(
          req.params.id,
          { $set: { membrii: arr } },
          function(err) {
            if (err) return next(err);

            Candidat.findByIdAndUpdate(
              req.body.id_candidat,
              { $set: { partid: partid } },
              function(err) {
                if (err) return next(err);
                res.send("Candidat Adaugat");
              }
            );
          }
        );
      }
    });
  });
};

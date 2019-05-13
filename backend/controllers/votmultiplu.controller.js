var VotMultiplu = require("../models/votmultiplu.model");
var Candidat = require("../models/candidat.model");
var Partid = require("../models/partid.model");

exports.create_vote = function(req, res, next) {
  var product = new VotMultiplu({
    nume: req.body.nume,
    data_start: req.body.data_start,
    descriere: req.body.descriere,
    candidati: []
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Vot creat! Adauga candidati pls");
  });
};

exports.showAllVotes = function(req, res) {
  VotMultiplu.find({}).then(function(referendumuri) {
    res.send(referendumuri);
  });
};

exports.addCandidat = function(req, res, next) {
  var check = false;
  //cautam CAMPANIA dupa ID
  VotMultiplu.findById(req.params.id, function(err, campanie) {
    if (err) {
      res.send("Acest vot nu exista");
      return next(err);
    }
    //init array cu candidatii existenti
    var arr = campanie.candidati;
    var results = campanie.results;

    //daca campania exista, cautam candidatul pe care vrem sa-l adaugam in baza de date
    Candidat.findById(req.body.id_candidat, function(err, candidat) {
      if (err) {
        res.send("Candidatul nu exista :(");
        return next(err);
      }

      //verifica daca partidul nu exista cumva deja in campanie
      campanie.candidati.forEach(function(entry) {
        if (entry.candidat._id == req.body.id_candidat) check = true;
      });

      if (check) {
        res.send("Candidatul exista deja in campanie, sorry not sorry");
      } else {
        //adaugam in array candidatul dorit, dupa ID
        arr.push({ candidat: candidat, tip: "candidat" });
        results.push({ candidatID: req.body.id_candidat, voturi: 0 });

        VotMultiplu.findByIdAndUpdate(
          req.params.id,
          { $set: { candidati: arr, results: results } },
          function(err) {
            if (err) return next(err);
            res.send("Candidat adaugat!");
          }
        );
      }
    });
  });
};

exports.addPartid = function(req, res, next) {
  var check = false;
  //cautam CAMPANIA dupa ID
  VotMultiplu.findById(req.params.id, function(err, campanie) {
    if (err) {
      res.send("Acest vot nu exista");
      return next(err);
    }
    //init array cu candidatii existenti
    var arr = campanie.candidati;
    var results = campanie.results;

    //daca campania exista, cautam partidul pe care vrem sa-l adaugam in baza de date
    Partid.findById(req.body.id_partid, function(err, candidat) {
      if (err) {
        res.send("Partidul nu exista :(");
        return next(err);
      }

      //verifica daca partidul nu exista cumva deja in campanie
      campanie.candidati.forEach(function(entry) {
        if (entry.candidat._id == req.body.id_partid) check = true;
      });

      if (check) {
        res.send("Partidul exista deja in campanie, sorry not sorry");
      } else {
        //adaugam in array partidul dorit, dupa ID
        arr.push({ candidat: candidat, tip: "partid" });
        results.push({ candidatID: req.body.id_partid, voturi: 0 });

        VotMultiplu.findByIdAndUpdate(
          req.params.id,
          { $set: { candidati: arr, results: results } },
          function(err) {
            if (err) return next(err);
            res.send("Partid adaugat!");
          }
        );
      }
    });
  });
};

exports.voteaza = function(req, res) {
  VotMultiplu.findById(req.params.id, function(err, campanie) {
    if (err) return next(err);

    var results = campanie.results;

    if (campanie.candidati.indexOf(req.body.id_candidat) !== -1) {
      results.forEach(function(entry) {
        if (entry.candidatID === req.body.id_candidat)
          entry.voturi = entry.voturi + 1;
      });

      VotMultiplu.findByIdAndUpdate(
        req.params.id,
        { $set: { results: results } },
        function(err) {
          if (err) return next(err);
          res.send("Candidat votat cu succes! :3");
        }
      );
    } else res.send("Nu exista acest candidat... :(");
  });
};

exports.deleteVotMultiplu = function(req, res, next) {
  VotMultiplu.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Vot multiplu stears cu success!");
  });
};

var Product = require("../models/user.model");

exports.test = function(req, res) {
  res.send("Yas the server is up and running");
};

exports.product_create = function(req, res, next) {
  var product = new Product({
    nume: req.body.nume,
    prenume: req.body.prenume,
    adresa: req.body.adresa,
    cnp: req.body.cnp
  });

  product.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Product Created successfully");
  });
};

exports.showAllUsers = function(req, res) {
  Product.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};

exports.product_details = function(req, res, next) {
  Product.findById(req.params.id, function(err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.product_update = function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) return next(err);
    res.send("Product udpated.");
  });
};

exports.product_delete = function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

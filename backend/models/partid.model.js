const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Candidat = require("./candidat.model");

let Partid = new Schema({
  nume: { type: String, required: true, max: 100 },
  abreviere: { type: String, required: true, max: 100 },
  descriere: { type: String, required: true },
  membrii: [{ type: Object }]
});

module.exports = mongoose.model("Partid", Partid);

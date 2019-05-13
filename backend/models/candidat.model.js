const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Candidat = new Schema({
  nume: { type: String, required: true, max: 100 },
  prenume: { type: String, required: true, max: 100 },
  partid: { type: Object }
});

module.exports = mongoose.model("Candidat", Candidat);

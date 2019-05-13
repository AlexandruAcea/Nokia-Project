const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let VotMultiplu = new Schema({
  nume: { type: String, required: true, max: 100 },
  data_start: { type: String, required: true },
  descriere: { type: String, required: true },
  candidati: [{ type: Object }],
  results: [{ type: Object }]
});

module.exports = mongoose.model("VotMultiplu", VotMultiplu);

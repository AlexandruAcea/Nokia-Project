const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let VotReferendumSchema = new Schema({
  nume: { type: String, required: true, max: 100 },
  data_start: { type: String, required: true },
  descriere: { type: String, required: true },
  voturi_da: { type: Number, required: true, default: 0 },
  voturi_nu: { type: Number, required: true, default: 0 },
  votStatus: { type: String }
});

module.exports = mongoose.model("VotReferendum", VotReferendumSchema);

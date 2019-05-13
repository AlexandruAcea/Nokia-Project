const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  nume: { type: String, required: true, max: 100 },
  prenume: { type: String, required: true, max: 100 },
  adresa: { type: String, required: true, max: 100 },
  cnp: { type: Number, required: true }
});

module.exports = mongoose.model("User", UserSchema);

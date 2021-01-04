const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let UserSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("Users", UserSchema);

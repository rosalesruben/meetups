const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MeetupSchema = new Schema({
  title: String,
  description: String,
  aboutMeetup: String,

  date: Date,
  organizer: String,
  location: String,
  //Attenders users IDs
  attenders: [String],
});

module.exports = mongoose.model("Meetups", MeetupSchema);

const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  subject: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }

},{ timestamps: true }) 

module.exports = mongoose.model("Session", sessionSchema)
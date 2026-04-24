const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  tag: String,
  due: String,
  status: String
})

module.exports = mongoose.model("Tasks", taskSchema)
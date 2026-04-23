// const mongoose = require("mongoose")

// const taskSchema = new mongoose.Schema(
// {
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   title: String,
//   tag: String,
//   due: String,

//   status: {
//     type: String,
//     default: "todo",
//   },
// },
// { timestamps: true }
// )

// module.exports = mongoose.model("Tasks", taskSchema)

const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  tag: String,
  due: String,
  status: String
})

module.exports = mongoose.model("Tasks", taskSchema)
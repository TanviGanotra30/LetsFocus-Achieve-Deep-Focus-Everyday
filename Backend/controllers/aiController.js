const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

console.log(process.env.GEMINI_API_KEY)


exports.generateStudyPlan = async (req, res) => {

  try {

    const { subjects, hours, goal } = req.body

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
Create a study plan.

Subjects: ${subjects}
Study time available: ${hours} hours
Goal: ${goal}

Generate a structured study plan with time allocation.
`

    const result = await model.generateContent(prompt)

    const response = result.response.text()

    res.json({ plan: response })

  } catch (error) {

  console.log("Gemini Error:", error)

  res.status(500).json({
    message: "AI error",
    error: error.message
  })

}

}
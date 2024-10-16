import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash'
})

const prompt = `I am applying to ${jobTitle} position at ${companyName}. I want to know how much my resume matches with the provided job description in terms of percentage. Attaching the job description and my resume for the reference. I would like to know what are the skills that are lacking in my resume based on the job description. 

Job Description:
${jobDescription}

Resume:
${resume}
`
const result = await model.generateContent(prompt)
console.log(result.response.text())
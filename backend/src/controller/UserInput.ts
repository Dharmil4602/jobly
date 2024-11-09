import { RequestHandler } from "express";
import dotenv from "dotenv";
import generativeModel from "../model/VertexAI";

dotenv.config();

const userInput: RequestHandler = async (req, res) => {
  /**  We'll be receiving the following from request.
   * 1. Job Title
   * 2. Job Description
   * 3. Resume
   */

  try {
    const { jobTitle, jobDescription, companyName, resume } = req.body;
    const prompt = `I am applying to ${jobTitle} position at ${companyName}. I want to know how much my resume matches with the provided job description on the scale of 1-10. Attaching the job description and my resume for the reference. I would like to know what are the skills that are lacking in my resume based on the job description.

    Job Description:
    ${jobDescription}

    Resume:
    ${resume}
    `;

    // Vertex AI
    const result = await generativeModel.generateContent(prompt);

    if (
      result.response &&
      result.response.candidates &&
      result.response.candidates.length > 0
    ) {
      const text = result.response.candidates[0].content.parts[0].text;
      
      const matchScore = text?.split("**", 3)[1] || text?.split("**", 4)[1];

      const titles = text?.split("**")
        .filter((_, index) => index % 2 !== 0)
        .map((title) => title.trim());

      const descriptionForEachTitle = text?.split("**")
        .filter((_, index) => index % 2 === 0)
        .map((description) => description.trim());

      const matchAnalysis = titles?.map((title, index) => ({
        title: title,
        description: descriptionForEachTitle?.[index]
      }));      

      res.json({ matchScore: matchScore, matchAnalysis: matchAnalysis });
    }
  } catch (error) {
    console.error("Error processing request: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
export default userInput;

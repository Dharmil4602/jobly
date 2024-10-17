import { VertexAI } from "@google-cloud/vertexai";
import serviceAccount from '../config/serviceAccount.json'

const project_location = process.env.GOOGLE_CLOUD_PROJECT_LOCATION;
const textModel = "gemini-1.5-flash-002";

const vertexAI = new VertexAI({
  project: serviceAccount.project_id,
  location: project_location,
});

const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
});

export default generativeModel

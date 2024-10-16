import { RequestHandler } from "express";

const userInput: RequestHandler = (req, res) => {
    /**  We'll be receiving the following from request. 
     * 1. Job Title
     * 2. Job Description
     * 3. Resume
    */
    const inputData = req.body;
    if (res.statusCode === 200) {
        console.log("User Input Received Successfully");
        res.json({message: "User Input Received Successfully"});
    }
    console.log("User Input: ", inputData);
}

export default userInput
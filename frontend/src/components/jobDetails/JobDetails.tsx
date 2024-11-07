import React, { useState } from "react";
import axios from "axios";
import Analysis from "../analysis/Analysis";

function JobDetails() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDetails = {
      jobTitle,
      companyName,
      jobDescription,
      resume,
    };

    // Sending formDetails to backend
    try {
      const response = await axios.post(
        `http://localhost:5000/job-details/analyze`,
        formDetails
      );

      if (response.status === 200) {
        setAnalysisData(response.data);
      } else {
        console.log("Error in response:", response.data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering
  if (analysisData) {
    return <Analysis data={analysisData} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Job Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg space-y-6"
      >
      
        <div className="flex flex-col">
          <label
            className="text-lg font-medium text-gray-700 mb-2"
            htmlFor="jobTitle"
          >
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lg font-medium text-gray-700 mb-2"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-lg font-medium text-gray-700 mb-2"
            htmlFor="jobDescription"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            required
          />
        </div>

        {/* Resume Input */}
        <div className="flex flex-col">
          <label
            className="text-lg font-medium text-gray-700 mb-2"
            htmlFor="resume"
          >
            Resume
          </label>
          <textarea
            id="resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Submit Job Details"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobDetails;

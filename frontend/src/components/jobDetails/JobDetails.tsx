import React, { useEffect, useState } from "react";
import axios from "axios";
import Analysis from "../analysis/Analysis";
import { Briefcase, Building2, FileText, FileTextIcon } from "lucide-react";

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

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/job-details/analyze`,
        formDetails
      );

      chrome.storage.sync.set({ formDetails, analysisMode: true }, function () {
        console.log("Form details saved to chrome storage");
      });

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

  useEffect(() => {
    chrome.storage.sync.get(["formDetails", "analysisMode"], (result) => {
      if (result.formDetails && result.analysisMode) {
        setJobTitle(result.formDetails.jobTitle);
        setCompanyName(result.formDetails.companyName);
        setJobDescription(result.formDetails.jobDescription);
        setResume(result.formDetails.resume);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      chrome.storage.sync.remove(["formDetails", "analysisMode"], () => {
        console.log("Form details and analysis mode removed from storage");
      });
    };
  }, []);

  if (analysisData) {
    return <Analysis data={analysisData} onGoBack={() => setAnalysisData(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Jobly: Resume Analyzer
          </h1>
          <p className="text-gray-600 text-xl">
            Compare your resume with job requirements and get instant feedback
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl"
        >
          <div className="space-y-6">
            {/* Job Title Input */}
            <div className="relative">
              <label
                className="flex items-center text-lg font-medium text-gray-700 mb-2"
                htmlFor="jobTitle"
              >
                <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>

            {/* Company Name Input */}
            <div className="relative">
              <label
                className="flex items-center text-lg font-medium text-gray-700 mb-2"
                htmlFor="companyName"
              >
                <Building2 className="w-5 h-5 mr-2 text-blue-500" />
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="e.g. Tech Corp Inc."
                required
              />
            </div>

            {/* Job Description Input */}
            <div className="relative">
              <label
                className="flex items-center text-lg font-medium text-gray-700 mb-2"
                htmlFor="jobDescription"
              >
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-40"
                placeholder="Paste the job description here..."
                required
              />
            </div>

            {/* Resume Input */}
            <div className="relative">
              <label
                className="flex items-center text-lg font-medium text-gray-700 mb-2"
                htmlFor="resume"
              >
                <FileTextIcon className="w-5 h-5 mr-2 text-blue-500" />
                Resume
              </label>
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-40"
                placeholder="Paste your resume content here..."
                required
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-gray-600 text-lg">
          Your data is processed securely and never stored permanently
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

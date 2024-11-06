import React from "react";

interface AnalysisProps {
  data: {
    matchScore: string;
    matchAnalysis: string;
  };
}

const Analysis: React.FC<AnalysisProps> = ({ data }) => {
  return (
    <div className="analysis-container max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Resume Analysis
      </h2>
      <div className="match-score mb-6">
        <p className="text-lg text-gray-600 font-medium">
          <strong>Match Score:</strong>
        </p>
        <p className="text-2xl text-green-500 font-semibold">
          {data.matchScore}
        </p>
      </div>
      <div className="match-analysis">
        <p className="text-lg text-gray-600 font-medium mb-2">
          <strong>Analysis:</strong>
        </p>
        <div
          className="analysis-text mt-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.matchAnalysis }}
        />
      </div>
    </div>
  );
};

export default Analysis;

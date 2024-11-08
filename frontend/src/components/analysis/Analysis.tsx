// import React from "react";

// interface AnalysisProps {
//   data: {
//     matchScore: string;
//     matchAnalysis: string;
//   },
//   onGoBack: () => void;
// }

// const Analysis: React.FC<AnalysisProps> = ({ data, onGoBack }) => {

//   // const goBack = () => {
//   //   chrome.storage.sync.remove("analysisMode", () => {
//   //     window.location.reload();
//   //     console.log("Form details removed from chrome storage");
//   //   })
//   // }
//   return (
//     <div className="analysis-container max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <div>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           onClick={onGoBack}
//         >
//           Go Back
//         </button>
//       </div>
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
//         Resume Analysis
//       </h2>
//       <div className="match-score mb-6">
//         <p className="text-lg text-gray-600 font-medium">
//           <strong>Match Score:</strong>
//         </p>
//         <p className="text-2xl text-green-500 font-semibold">
//           {data.matchScore}
//         </p>
//       </div>
//       <div className="match-analysis">
//         <p className="text-lg text-gray-600 font-medium mb-2">
//           <strong>Analysis:</strong>
//         </p>
//         <div
//           className="analysis-text mt-4 text-gray-700"
//           dangerouslySetInnerHTML={{ __html: data.matchAnalysis }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Analysis;


import React from "react";
import { ArrowLeft, CheckCircle2, BarChart2, FileSearch } from "lucide-react";

interface AnalysisProps {
  data: {
    matchScore: string;
    matchAnalysis: string;
  };
  onGoBack: () => void;
}

const Analysis: React.FC<AnalysisProps> = ({ data, onGoBack }) => {
  const scorePercentage = parseInt(data.matchScore);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onGoBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Job Details</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <FileSearch className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Resume Analysis Results
            </h2>
            <p className="text-gray-600">
              Detailed breakdown of how your resume matches the job requirements
            </p>
          </div>

          {/* Match Score Card */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-700">Match Score</h3>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-6 h-6 ${getScoreColor(scorePercentage)}`} />
                <span className={`text-3xl font-bold ${getScoreColor(scorePercentage)}`}>
                  {data.matchScore}
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out rounded-full ${
                  scorePercentage >= 80 ? 'bg-green-500' : 
                  scorePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileSearch className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800">
                Detailed Analysis
              </h3>
            </div>
            <div className="prose prose-blue max-w-none">
              <div
                className="bg-gray-50 rounded-xl p-6 text-gray-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: data.matchAnalysis }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onGoBack}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
            >
              Analyze Another Resume
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          Want to improve your match score? Consider updating your resume based on the analysis above.
        </div>
      </div>
    </div>
  );
};

export default Analysis;

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, BarChart2, FileSearch, ChevronDown, ChevronUp } from 'lucide-react';

interface AnalysisItem {
  title: string;
  description: string;
}

interface AnalysisProps {
  data: {
    matchScore: string;
    matchAnalysis: AnalysisItem[];
  };
  onGoBack: () => void;
}

const CollapsibleSection = ({ title, description }: AnalysisItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="font-medium text-gray-700">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white">
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

const Analysis: React.FC<AnalysisProps> = ({ data, onGoBack }) => {
  const scorePercentage = parseInt(data.matchScore);
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };
  
  const filteredAnalysis = data.matchAnalysis.filter(
    (item, index) => 
      item.description !== "*" && 
      !/\d+\/10/.test(item.description) && index !== 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            <p className="text-gray-600 text-xl">
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
          </div>

          {/* Detailed Analysis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileSearch className="w-5 h-5 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800">
                Detailed Analysis
              </h3>
            </div>
            <div className="space-y-2">
              {filteredAnalysis.map((item, index) => (
                <CollapsibleSection 
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              ))}
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
        <div className="text-center mt-6 text-gray-600 text-lg">
          Want to improve your match score? Consider updating your resume based on the analysis above.
        </div>
      </div>
    </div>
  );
};

export default Analysis;
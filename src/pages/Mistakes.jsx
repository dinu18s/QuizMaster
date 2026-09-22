import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react';
import { attemptService } from '../services/storage';

export default function Mistakes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const attemptId = searchParams.get('attemptId');

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttempt();
  }, [attemptId]);

  const loadAttempt = () => {
    try {
      const data = attemptService.getById(attemptId);
      setAttempt(data);
    } catch (e) {
      console.error('Error loading attempt:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600 font-light">Loading mistakes...</div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Results not found</p>
          <button
            onClick={() => navigate('/difficultyselect')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold cursor-pointer"
          >
            Go to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const mistakes = attempt.questions_data?.filter((q) => !q.isCorrect) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(`/results?attemptId=${attempt.id}`)}
            className="mb-4 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 font-medium inline-flex items-center transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Results</span>
          </button>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Review Your Mistakes</h1>
            <p className="text-lg text-gray-600 font-light">
              You got {mistakes.length} question{mistakes.length > 1 ? 's' : ''} wrong. Let's learn from
              them!
            </p>
          </div>
        </motion.div>

        {/* Mistakes List */}
        <div className="space-y-6">
          {mistakes.map((item, qIdx) => (
            <motion.div
              key={qIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    {qIdx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-relaxed">{item.question}</h3>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {item.options.map((optText, optIdx) => {
                  const isSelected = optIdx === item.selectedAnswer;
                  const isCorrect = optIdx === item.correctAnswer;

                  let borderClass = 'bg-gray-50 border-gray-200';
                  let textClass = 'text-gray-700';

                  if (isCorrect) {
                    borderClass = 'bg-emerald-50 border-emerald-500';
                    textClass = 'text-emerald-900';
                  } else if (isSelected) {
                    borderClass = 'bg-red-50 border-red-500';
                    textClass = 'text-red-900';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-4 rounded-xl border-2 ${borderClass} transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : isSelected
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <p className={`font-medium ${textClass}`}>{optText}</p>
                        </div>

                        {isCorrect && <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />}
                        {isSelected && !isCorrect && (
                          <CircleX className="w-5 h-5 text-red-600 shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Educational Explanation */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-xl p-5">
                <p className="text-sm font-semibold text-indigo-900 mb-2">💡 Explanation</p>
                <p className="text-sm text-indigo-800 leading-relaxed">{item.explanation}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Results Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => navigate(`/results?attemptId=${attempt.id}`)}
            className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Back to Results
          </button>
        </motion.div>
      </div>
    </div>
  );
}

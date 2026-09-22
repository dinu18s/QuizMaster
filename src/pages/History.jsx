import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, ArrowRight, RotateCcw, Calendar, CheckCircle } from 'lucide-react';
import { attemptService } from '../services/storage';

export default function History() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    setAttempts(attemptService.getAll());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/difficultyselect')}
            className="mb-4 hover:bg-gray-100 px-4 py-2 rounded-xl text-gray-700 font-medium inline-flex items-center transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Dashboard</span>
          </button>

          <div className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Quiz History</h1>
              <p className="text-lg text-gray-600 font-light">
                Track your performance and progress over time
              </p>
            </div>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <Trophy className="w-8 h-8" />
            </div>
          </div>
        </motion.div>

        {attempts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-md p-12 text-center"
          >
            <p className="text-xl text-gray-600 mb-6 font-light">
              You haven't completed any quizzes yet.
            </p>
            <button
              onClick={() => navigate('/difficultyselect')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-lg transition-colors cursor-pointer"
            >
              Start Your First Quiz
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {attempts.map((att, idx) => (
              <motion.div
                key={att.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {att.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(att.completed_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{att.topic}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Score: <span className="font-semibold text-gray-800">{att.score}%</span> (
                    {att.correct_answers}/{att.total_questions} correct)
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/results?attemptId=${att.id}`)}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/quiz?difficulty=${att.difficulty}&topic=${att.topic
                          .toLowerCase()
                          .replace(/\s+/g, '-')}&topicName=${encodeURIComponent(att.topic)}`
                      )
                    }
                    className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Re-try</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, CircleAlert, RotateCcw, ArrowRight, House } from 'lucide-react';
import confetti from 'canvas-confetti';
import { attemptService } from '../services/storage';

export default function Results() {
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
      if (data && data.score >= 70) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (e) {
      console.error('Error loading attempt:', e);
    } finally {
      setLoading(false);
    }
  };

  const getScoreFeedback = (score) => {
    if (score >= 90) return { text: 'Outstanding!', color: 'from-emerald-500 to-teal-500', emoji: '🌟' };
    if (score >= 80) return { text: 'Excellent!', color: 'from-blue-500 to-indigo-500', emoji: '🎯' };
    if (score >= 70) return { text: 'Good Job!', color: 'from-purple-500 to-pink-500', emoji: '👏' };
    if (score >= 60) return { text: 'Not Bad!', color: 'from-amber-500 to-orange-500', emoji: '💪' };
    if (score >= 50) return { text: 'Keep Trying!', color: 'from-orange-500 to-red-500', emoji: '📚' };
    return { text: 'Better Luck Next Time', color: 'from-red-500 to-pink-500', emoji: '🔄' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600 font-light">Loading results...</div>
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

  const feedback = getScoreFeedback(attempt.score);
  const mistakes = attempt.questions_data?.filter((q) => !q.isCorrect) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-12 mb-8 text-center overflow-hidden relative"
        >
          {/* Ambient Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${feedback.color} rounded-full opacity-10 blur-3xl`}
            />
            <div
              className={`absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br ${feedback.color} rounded-full opacity-10 blur-3xl`}
            />
          </div>

          <div className="relative z-10">
            {/* Trophy Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
              className="mb-6"
            >
              <div
                className={`w-24 h-24 mx-auto bg-gradient-to-br ${feedback.color} rounded-full flex items-center justify-center shadow-xl`}
              >
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Title & Topic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-5xl font-black text-gray-900 mb-2">
                {feedback.emoji} {feedback.text}
              </h1>
              <p className="text-xl text-gray-600 font-light">
                You've completed the {attempt.topic} quiz
              </p>
            </motion.div>

            {/* Big Score Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="my-12"
            >
              <div
                className={`inline-block bg-gradient-to-br ${feedback.color} text-white rounded-3xl px-16 py-8 shadow-2xl`}
              >
                <p className="text-7xl font-black mb-2">{attempt.score}%</p>
                <p className="text-lg font-semibold opacity-90">
                  {attempt.correct_answers} / {attempt.total_questions} Correct
                </p>
              </div>
            </motion.div>

            {/* Metrics Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <p className="text-3xl font-bold text-emerald-600">{attempt.correct_answers}</p>
                <p className="text-sm text-emerald-700 font-medium">Correct</p>
              </div>

              <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                <p className="text-3xl font-bold text-red-600">
                  {attempt.total_questions - attempt.correct_answers}
                </p>
                <p className="text-sm text-red-700 font-medium">Incorrect</p>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <p className="text-3xl font-bold text-indigo-600 capitalize">{attempt.difficulty}</p>
                <p className="text-sm text-indigo-700 font-medium">Level</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Review Mistakes Button */}
        {mistakes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(`/mistakes?attemptId=${attempt.id}`)}
              className="w-full h-16 rounded-2xl border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700 font-semibold text-lg flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
            >
              <CircleAlert className="w-5 h-5 mr-2" />
              <span>
                Review {mistakes.length} Mistake{mistakes.length > 1 ? 's' : ''}
              </span>
            </button>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <button
            onClick={() =>
              navigate(
                `/quiz?difficulty=${attempt.difficulty}&topic=${attempt.topic
                  .toLowerCase()
                  .replace(/\s+/g, '-')}&topicName=${encodeURIComponent(attempt.topic)}`
              )
            }
            className="h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            <span>Re-attempt Quiz</span>
          </button>

          <button
            onClick={() => navigate(`/topicselect?difficulty=${attempt.difficulty}`)}
            className="h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold flex items-center justify-center transition-colors cursor-pointer shadow-md hover:shadow-lg"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            <span>Next Quiz</span>
          </button>

          <button
            onClick={() => navigate('/difficultyselect')}
            className="h-14 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 rounded-2xl font-semibold flex items-center justify-center transition-colors cursor-pointer"
          >
            <House className="w-5 h-5 mr-2" />
            <span>Home</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

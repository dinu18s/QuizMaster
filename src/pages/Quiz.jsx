import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderCircle, CircleCheck, CircleX } from 'lucide-react';
import { getQuizQuestions } from '../data/questions';
import { attemptService } from '../services/storage';

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'medium';
  const topic = searchParams.get('topic') || 'javascript';
  const topicName = searchParams.get('topicName') || 'JavaScript';

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answersSummary, setAnswersSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, [difficulty, topic, topicName]);

  const loadQuiz = async () => {
    setLoading(true);
    // Simulate natural brief loading delay for realistic polish
    setTimeout(() => {
      const q = getQuizQuestions(topic, topicName, difficulty);
      setQuestions(q);
      setLoading(false);
    }, 600);
  };

  const handleSelectAnswer = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = index === currentQ.correct_answer;

    setAnswersSummary((prev) => [
      ...prev,
      {
        question: currentQ.question,
        options: currentQ.options,
        selectedAnswer: index,
        correctAnswer: currentQ.correct_answer,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const correctCount =
        answersSummary.filter((a) => a.isCorrect).length +
        (selectedAnswer === questions[currentIndex].correct_answer ? 1 : 0);
      const score = Math.round((correctCount / questions.length) * 100);
      saveAttempt(score, correctCount);
    }
  };

  const saveAttempt = (score, correctCount) => {
    const finalAnswers = [...answersSummary];
    // Ensure last question is in final summary if not already included
    if (selectedAnswer !== null && finalAnswers.length < questions.length) {
      const lastQ = questions[currentIndex];
      finalAnswers.push({
        question: lastQ.question,
        options: lastQ.options,
        selectedAnswer,
        correctAnswer: lastQ.correct_answer,
        isCorrect: selectedAnswer === lastQ.correct_answer,
        explanation: lastQ.explanation
      });
    }

    const attempt = attemptService.create({
      difficulty,
      topic: topicName,
      score,
      total_questions: questions.length,
      correct_answers: correctCount,
      questions_data: finalAnswers,
      completed_at: new Date().toISOString()
    });

    navigate(`/results?attemptId=${attempt.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoaderCircle className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-light">Generating your quiz...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Failed to generate quiz. Please try again.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                {topicName} • {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                Question {currentIndex + 1} of {questions.length}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(progressPercent)}%</p>
            </div>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = optIdx === currentQ.correct_answer;
                const showFeedback = isAnswered;

                let cardStyle = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
                let textStyle = 'text-gray-900';

                if (showFeedback) {
                  if (isSelected && isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500';
                    textStyle = 'text-emerald-900';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-red-50 border-red-500';
                    textStyle = 'text-red-900';
                  } else if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500';
                    textStyle = 'text-emerald-900';
                  }
                }

                return (
                  <div key={optIdx}>
                    <button
                      onClick={() => handleSelectAnswer(optIdx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${cardStyle} ${
                        !isAnswered ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 shrink-0 ${
                              showFeedback && isCorrect
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : showFeedback && isSelected
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <p className={`text-lg font-medium ${textStyle}`}>{optionText}</p>
                        </div>

                        {showFeedback && isCorrect && (
                          <CircleCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <CircleX className="w-6 h-6 text-red-600 shrink-0" />
                        )}
                      </div>
                    </button>

                    {/* Explanation Box under relevant option */}
                    {showFeedback && (isSelected || isCorrect) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className={`mt-3 ml-14 p-4 rounded-xl ${
                          isCorrect
                            ? 'bg-emerald-50 border border-emerald-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold mb-1 ${
                            isCorrect ? 'text-emerald-900' : 'text-red-900'
                          }`}
                        >
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </p>
                        <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                          {currentQ.explanation}
                        </p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Question / View Results Button */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end"
          >
            <button
              onClick={handleNext}
              className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'} →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

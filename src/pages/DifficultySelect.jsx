import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { DIFFICULTIES } from '../data/difficulties';

export default function DifficultySelect() {
  const navigate = useNavigate();

  const handleSelect = (difficultyId) => {
    navigate(`/topicselect?difficulty=${difficultyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Choose Your Level</h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Select the difficulty that matches your expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {DIFFICULTIES.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.button
                key={diff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => handleSelect(diff.id)}
                className="group relative cursor-pointer text-left w-full focus:outline-none"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${diff.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div
                  className={`relative bg-white rounded-3xl p-8 border-2 ${diff.borderColor} hover:border-opacity-0 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                >
                  <div
                    className={`${diff.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-10 h-10 ${diff.textColor}`} />
                  </div>

                  <div className="text-center space-y-3 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{diff.name}</h3>
                    <p className="text-gray-600 font-light">{diff.description}</p>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-2 text-sm font-semibold ${diff.textColor} group-hover:gap-3 transition-all`}
                  >
                    <span>Select Level</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 font-light">Over 10,000 quizzes completed this month</p>
        </motion.div>
      </div>
    </div>
  );
}

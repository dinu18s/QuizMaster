import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Search } from 'lucide-react';
import { TOPICS } from '../data/topics';

export default function TopicSelect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'medium';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = TOPICS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTopic = (topicId, topicName) => {
    navigate(`/quiz?difficulty=${difficulty}&topic=${topicId}&topicName=${encodeURIComponent(topicName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level</span>
          </div>

          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Select Your Topic</h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Choose from our curated collection of quiz topics
          </p>
        </motion.div>

        {/* Search Bar at Top */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for any topic or concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none bg-white transition-colors shadow-lg placeholder:text-gray-400"
            />
          </div>

          {searchQuery && filteredTopics.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-6 text-gray-500 font-light"
            >
              No topics found. Try a different search term.
            </motion.p>
          )}
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchQuery ? filteredTopics : filteredTopics.slice(0, 9)).map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                onClick={() => handleSelectTopic(topic.id, topic.name)}
                className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {topic.category}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-bold">{topic.popularity}%</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {topic.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Start Quiz →
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

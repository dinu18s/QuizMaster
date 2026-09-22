import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { authService } from '../services/storage';

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Simulate quick auth check
      const user = authService.me();
      if (user) {
        // If already authenticated, direct navigation is ready or user can proceed
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    authService.login();
    navigate('/difficultyselect');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-indigo-200 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Ambient background blur blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white px-12 py-8 rounded-3xl shadow-2xl">
                <h1 className="text-6xl font-black tracking-tight">DP'z</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <p className="text-lg font-semibold tracking-widest uppercase">Quiz</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-600 font-light max-w-md mx-auto leading-relaxed"
          >
            Test your knowledge with beautifully crafted quizzes
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-12"
        >
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
              <p className="text-gray-600 font-light">Sign in to start your quiz journey</p>
            </div>

            <button
              onClick={handleSignIn}
              className="w-full h-14 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg group flex items-center justify-center cursor-pointer"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-sm text-gray-500">By continuing, you agree to our Terms of Service</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-6 text-center"
        >
          {[
            { label: 'Multiple Topics', value: '50+' },
            { label: 'Difficulty Levels', value: '3' },
            { label: 'Success Rate', value: '95%' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {item.value}
              </p>
              <p className="text-sm text-gray-600 font-light">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

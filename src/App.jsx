import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DifficultySelect from './pages/DifficultySelect';
import TopicSelect from './pages/TopicSelect';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Mistakes from './pages/Mistakes';
import History from './pages/History';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />

        {/* Difficulty Select */}
        <Route path="/difficultyselect" element={<DifficultySelect />} />
        <Route path="/DifficultySelect" element={<DifficultySelect />} />

        {/* Topic Select */}
        <Route path="/topicselect" element={<TopicSelect />} />
        <Route path="/TopicSelect" element={<TopicSelect />} />

        {/* Quiz */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Quiz" element={<Quiz />} />

        {/* Results */}
        <Route path="/results" element={<Results />} />
        <Route path="/Results" element={<Results />} />

        {/* Mistakes Review */}
        <Route path="/mistakes" element={<Mistakes />} />
        <Route path="/Mistakes" element={<Mistakes />} />

        {/* History */}
        <Route path="/history" element={<History />} />
        <Route path="/History" element={<History />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

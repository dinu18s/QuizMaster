import React from 'react';
import { useNavigate } from 'react-router-dom';
import { House } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-slate-300">404</h1>
          <div className="h-0.5 w-16 bg-slate-200 mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-slate-800">Page Not Found</h2>
          <p className="text-slate-600 leading-relaxed">
            The page you are looking for could not be found in this application.
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <House className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

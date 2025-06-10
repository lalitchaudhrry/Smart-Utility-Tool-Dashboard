// src/components/GeminiTool.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const GeminiTool = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('http://localhost:5000/api/gemini', { prompt });
      setResponse(res.data.text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('⚠️ Something went wrong while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse('');
  };

  return (
    
    <motion.div
      className="w-full sm:max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1"> Smart Assistant Tool</h2>
        <p className="text-sm sm:text-base text-gray-500">Ask anything or get help with a task instantly.</p>
      </div>

      {/* Textarea */}
      <textarea
        className="w-full p-4 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none transition mb-4 text-sm sm:text-base"
        rows="4"
        placeholder="e.g. Explain recursion with an example..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto bg-secondary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary transition disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
        {loading ? 'Loading...' : 'Submit'}
        </motion.button>

        <button
          onClick={handleClear}
          className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-400 text-red-500 font-medium px-5 py-2.5 rounded-xl hover:bg-red-50 transition"
        >
          <FiTrash2 className="text-lg" />
          Clear
        </button>
      </div>

      {/* Output */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-white p-5 rounded-xl border border-primary max-h-[400px] overflow-y-auto"
        >
          <h3 className="font-semibold text-primary mb-2 text-base">Response:</h3>
          <p className="whitespace-pre-wrap text-gray-700 text-sm sm:text-base">{response}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GeminiTool;

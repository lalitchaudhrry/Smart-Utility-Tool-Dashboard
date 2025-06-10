import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const SummarizeTool = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');
    try {
      const res = await axios.post('http://localhost:5000/api/gemini', {
        prompt: `Summarize this text:\n\n${text}`,
      });
      setSummary(res.data.text);
    } catch (err) {
      console.error('Error:', err);
      setSummary(' Something went wrong while summarizing.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setSummary('');
  };

  return (
    
    <motion.div
      className="w-full sm:max-w-xl mx-auto p-6 rounded-2xl shadow-lg bg-white "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary">Summarize Tool</h2>
        <p className="text-sm text-gray-500">Paste long text and get a concise summary instantly.</p>
      </div>

      {/* Input Textarea */}
      <textarea
        className="w-full p-3 rounded-lg border border-gray-300 mb-4 resize-none focus:ring-2 focus:ring-primary outline-none transition"
        rows="6"
        placeholder="Paste your content here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-secondary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary transition disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Summarizing...
            </>
          ) : (
            'Summarize'
          )}
        </motion.button>
        <button
          className="w-full sm:w-auto border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {/* Summary Output */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-white p-4 rounded-lg border border-primary max-h-[400px] overflow-y-auto"
        >
          <h3 className="font-semibold text-primary mb-2">Summary:</h3>
          <p className="whitespace-pre-wrap text-gray-700">{summary}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummarizeTool;

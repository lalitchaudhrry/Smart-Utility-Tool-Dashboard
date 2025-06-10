import React, { useState } from 'react';
import axios from 'axios';
import { FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';

const TranslateTool = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Hindi');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim() || !language.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/gemini', {
        prompt: `Translate the following text into ${language}:\n\n${text} and do not use '*' in response please`,
      });
      setTranslatedText(res.data.text);
    } catch (err) {
      console.error('Error:', err);
      setTranslatedText('Something went wrong during translation.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setLanguage('Hindi');
    setTranslatedText('');
  };

  return (
    <motion.div
      className="w-full sm:max-w-xl mx-auto p-6 rounded-2xl shadow-lg bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary">Translate Tool</h2>
        <p className="text-sm text-gray-600">Instantly translate any language into hindi and other languages.</p>
      </div>

      {/* Text Input */}
      <textarea
        className="w-full p-3 rounded-lg border border-gray-300 mb-3 resize-none focus:ring-2 focus:ring-primary outline-none transition"
        rows="5"
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Language Input */}
      <input
        type="text"
        className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:ring-2 focus:ring-primary outline-none transition"
        placeholder="Translate to (e.g. Hindi, Spanish, Tamil)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          className="w-full sm:w-auto bg-secondary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary transition disabled:opacity-50 flex items-center justify-center gap-2"
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Translating...
            </>
          ) : (
            'Translate'
          )}
        </button>
        <button
          className="w-full sm:w-auto border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {/* Result */}
      {translatedText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-white p-4 rounded-lg border border-primary max-h-[400px] overflow-y-auto"
        >
          <h3 className="font-semibold text-primary mb-2">Translation:</h3>
          <p className="whitespace-pre-wrap text-gray-700">{translatedText}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TranslateTool;

import React, { useState } from 'react';
import axios from 'axios';
import { FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';

const EmailGeneratorTool = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('polite');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/gemini', {
        prompt: `Write a ${tone} email for the following request and do not use '*' in the response and please make sure you only act like a expert email generator tool which does not provide anything else in response other than an email and you include proper salutations hello dear sir/ma'am types and proper closing with thank you and etc and if user prompts as : write me a song on rain - please provide with a response that sorry I'm only designed to respond and generate emails for you ! :\n\n${prompt}`,
      });
      setEmail(res.data.text);
    } catch (err) {
      console.error('Error:', err);
      setEmail('Something went wrong while generating the email.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setEmail('');
    setTone('polite');
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
        <h2 className="text-2xl font-bold text-primary">Email Generator Tool</h2>
        <p className="text-sm text-gray-600">Generate polite, formal, or friendly emails instantly based on your prompt.</p>
      </div>

      {/* Prompt Textarea */}
      <textarea
        className="w-full p-3 rounded-lg border border-gray-300 mb-4 resize-none focus:ring-2 focus:ring-primary outline-none transition"
        rows="4"
        placeholder="Enter a prompt or subject for the email..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Tone Selector */}
      <div className="flex flex-wrap gap-3 mb-4">
        {['polite', 'friendly', 'formal'].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-full font-medium capitalize transition ${
              tone === t
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-primary border border-primary hover:bg-primary hover:text-white'
            }`}
            onClick={() => setTone(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <button
          className="w-full sm:w-auto bg-secondary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary transition flex items-center justify-center gap-2 disabled:opacity-50"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              Generating...
            </>
          ) : (
            'Get Email'
          )}
        </button>
        <button
          className="w-full sm:w-auto border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

      {/* Output Section */}
      {email && (
        <motion.div
          className="mt-6 bg-white p-4 rounded-lg border border-primary max-h-[400px] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-primary mb-2">Generated Email:</h3>
          <p className="whitespace-pre-wrap text-gray-800">{email}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmailGeneratorTool;

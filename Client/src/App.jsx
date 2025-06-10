import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ToolSelector from './components/ToolSelector';
import GeminiTool from './components/GeminiTool';
import SummarizeTool from './components/SummarizeTool';
import TranslateTool from './components/TranslateTool';
import EmailGeneratorTool from './components/EmailGeneratorTool';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary p-6">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white mb-4">
          Smart Utility Tool Dashboard
        </h1>
        {/* Tool Selector shows on all pages */}
        <ToolSelector />

        {/* Route to selected tool */}
        <div className="mt-6 flex justify-center">
          <Routes>
            <Route path="/" element={<Navigate to="/gemini" />} />
            <Route path="/gemini" element={<GeminiTool />} />
            <Route path="/summarize" element={<SummarizeTool />} />
            <Route path="/translate" element={<TranslateTool />} />
            <Route path="/email" element={<EmailGeneratorTool />} />
            <Route path="*" element={<div className="text-center text-red-500">404 - Tool Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

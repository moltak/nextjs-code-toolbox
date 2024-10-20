'use client';

import { useState, useEffect } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
    } catch (error) {
      alert('Invalid JSON format!');
    }
  };

  // Execute format function with Control + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleFormat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [input, indentSize]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-2 text-center">JSON Formatter</h1>
      <p className="text-center mb-6 text-gray-700">
        Paste your JSON data below and press <strong>Ctrl + Enter</strong> or click the format button to format JSON.
      </p>
      <div className="mb-4">
        <label htmlFor="indentSize" className="block mb-2">Indent Size:</label>
        <input
          type="number"
          id="indentSize"
          className="w-20 p-2 border rounded"
          value={indentSize}
          onChange={(e) => setIndentSize(Number(e.target.value))}
          min="1"
          max="8"
        />
      </div>
      <textarea
        className="w-full h-40 p-4 border rounded mb-4 text-black"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleFormat}
      >
        Format JSON
      </button>
      <pre className="w-full h-40 p-4 border rounded bg-white text-black overflow-auto">{output}</pre>
    </div>
  );
}

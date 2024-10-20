'use client';

import { useState, useEffect } from 'react';

export default function CsvToJson() {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');

  const handleConvert = () => {
    try {
      const [headers, ...rows] = csv.trim().split('\n').map((row) => row.split(','));
      const jsonArray = rows.map((row) =>
        row.reduce((obj, value, index) => {
          obj[headers[index]] = value;
          return obj;
        }, {})
      );
      setJson(JSON.stringify(jsonArray, null, 2));
    } catch (error) {
      alert('Invalid CSV format!');
    }
  };

  // Control + Enter로 변환 기능 실행
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleConvert();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [csv]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-2 text-center">CSV to JSON Converter</h1>
      <p className="text-center mb-6 text-gray-700">
        Paste your CSV data below and press <strong>Ctrl + Enter</strong> or click the convert button to generate JSON.
      </p>
      <textarea
        className="w-full h-40 p-4 border rounded mb-4 text-black"
        placeholder="Paste your CSV here..."
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleConvert}
      >
        Convert to JSON
      </button>
      <pre className="w-full h-40 p-4 border rounded bg-white text-black overflow-auto">{json}</pre>
    </div>
  );
}
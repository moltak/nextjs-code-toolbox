'use client'

import { useState, useEffect } from 'react'

export default function JsonToCsv() {
  const [json, setJson] = useState('')
  const [csv, setCsv] = useState('')

  const handleConvert = () => {
    try {
      const jsonArray = Array.isArray(JSON.parse(json)) ? JSON.parse(json) : [JSON.parse(json)]

      const headers = Array.from(new Set(jsonArray.flatMap((obj: object) => Object.keys(obj))))

      const rows = jsonArray.map((obj: Record<string, unknown>) =>
        headers
          .map((header) =>
            obj[header as keyof typeof obj] !== undefined
              ? String(obj[header as keyof typeof obj])
              : ''
          )
          .join(',')
      )

      const csvString = `${headers.join(',')}\n${rows.join('\n')}`
      setCsv(csvString)
    } catch (error) {
      console.error(error)
      alert('Invalid JSON format!')
    }
  }

  // Control + Enter로 변환 기능 실행
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleConvert()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [json])

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-2 text-center">JSON to CSV Converter</h1>
      <p className="text-center mb-6 text-gray-700">
        Paste your JSON data below and press <strong>Ctrl + Enter</strong> or click the convert
        button to generate CSV.
      </p>
      <textarea
        className="w-full h-40 p-4 border rounded mb-4 text-black"
        placeholder='Paste your JSON here (e.g., {"head1": 1})'
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleConvert}
      >
        Convert to CSV
      </button>
      <pre className="w-full h-40 p-4 border rounded bg-white text-black overflow-auto">{csv}</pre>
    </div>
  )
}

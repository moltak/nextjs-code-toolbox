'use client'

import { useState, useCallback } from 'react'
import yaml from 'js-yaml'

export default function JsonToYaml() {
  const [json, setJson] = useState('')
  const [yamlOutput, setYamlOutput] = useState('')

  const handleConvert = useCallback(() => {
    try {
      const jsonObj = JSON.parse(json)
      const yamlString = yaml.dump(jsonObj)
      setYamlOutput(yamlString)
    } catch (error) {
      console.error('JSON parsing error:', error)
      alert('Invalid JSON format!')
    }
  }, [json])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        handleConvert()
      }
    },
    [handleConvert]
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <h1 className="text-3xl font-bold mb-2 text-center">JSON to YAML Converter</h1>
      <p className="text-center mb-4">
        Paste your JSON data below and press Ctrl + Enter or click the convert button to generate
        YAML.
      </p>
      <div className="space-y-4">
        <div>
          <textarea
            className="w-full h-64 p-2 border rounded"
            placeholder="Enter JSON here"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleConvert}
        >
          Convert to YAML
        </button>
        <div>
          <textarea
            className="w-full h-64 p-2 border rounded"
            placeholder="Converted YAML will appear here"
            value={yamlOutput}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  )
}

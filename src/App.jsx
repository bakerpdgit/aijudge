import { useState } from 'react'
import OpenAI from 'openai'
import './App.css'

function App() {
  const [fact1, setFact1] = useState('')
  const [fact2, setFact2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState('')

  const checkConsistency = async () => {
    if (!fact1.trim() || !fact2.trim()) {
      setError('Please enter both facts')
      return
    }

    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // WARNING: Using the OpenAI API directly from the browser exposes the API key
      // For production use, implement a backend API to handle OpenAI requests securely
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      })

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fact-checking assistant. Compare two facts and determine if they are consistent with each other. Respond with 'CONSISTENT' if the facts don't contradict each other, 'INCONSISTENT' if they contradict, or 'UNCERTAIN' if there's not enough information to determine. Then provide a brief explanation."
          },
          {
            role: "user",
            content: `Fact 1: ${fact1}\nFact 2: ${fact2}\n\nAre these two facts consistent with each other?`
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      })

      const response = completion.choices[0].message.content
      setResult(response)
    } catch (err) {
      setError(err.message || 'An error occurred while checking consistency')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      checkConsistency()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>AI Fact Consistency Checker</h1>
        <p className="subtitle">Compare two facts using AI to determine if they are consistent</p>
        
        <div className="input-section">
          <div className="api-key-section">
            <label htmlFor="api-key">OpenAI API Key:</label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="api-key-input"
            />
            <small>Your API key is stored only in your browser session</small>
          </div>

          <div className="fact-input">
            <label htmlFor="fact1">Fact 1:</label>
            <textarea
              id="fact1"
              value={fact1}
              onChange={(e) => setFact1(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the first fact..."
              rows={4}
            />
          </div>

          <div className="fact-input">
            <label htmlFor="fact2">Fact 2:</label>
            <textarea
              id="fact2"
              value={fact2}
              onChange={(e) => setFact2(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter the second fact..."
              rows={4}
            />
          </div>

          <button 
            onClick={checkConsistency} 
            disabled={loading}
            className="check-button"
          >
            {loading ? 'Checking...' : 'Check Consistency'}
          </button>
          <small className="hint">Tip: Press Ctrl+Enter to check</small>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>Result:</h2>
            <div className="result-content">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

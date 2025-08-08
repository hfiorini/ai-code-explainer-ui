'use client';
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const text = await res.text();
      try {
        const jsonData = JSON.parse(text);
        setResult(jsonData.response || text);
      } catch (parseError) {
        // If parsing fails, use the raw text
        setResult(text);
      }
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
      <h1>AI Code Explainer</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here:"
        style={{ width: '100%', height: 200, fontFamily: 'monospace' }}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={explain} disabled={loading || !code}>
          {loading ? 'Explaining...' : 'Explain!'}
        </button>
      </div>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{result}</pre>
    </main>
  );
}

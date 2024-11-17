'use client';
import { useState } from 'react';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleShortenUrl = async () => {
    if (!longUrl) {
      setError('Please enter a valid URL');
      return;
    }
    setError('');
    try {
      const response = await fetch('https://api.short.io/links', {
        method: 'POST',
        headers: {
          Authorization: 'sk_CdtRnWDvgLenyrzW', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalURL: longUrl,
          domain: 'h0ec.short.gy', // Replace with your Short.io domain
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortURL); // Use the "shortURL" key from the API response
        setIsCopied(false);
      } else {
        setError(data.message || 'Failed to shorten the URL. Please check the URL or API key.');
      }
    } catch (err) {
      setError('An error occurred while shortening the URL.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setIsCopied(true);
    });
  };

  return (
    <div className="container">
      <main>
        <h1>URL Shortener</h1>
        <p>Enter a long URL to generate its shortened version:</p>
        <input
          type="url"
          placeholder="Enter your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShortenUrl}>Shorten URL</button>
        {error && <p className="error">{error}</p>}
        {shortUrl && (
          <div className="short-url-container">
            <p>
              Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </p>
            <button onClick={handleCopy}>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</button>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; URL Shortener by Yemna Mehmood</p>
      </footer>
    </div>
  );
}

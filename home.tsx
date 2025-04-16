// src/app/home.tsx
'use client';

import { useState, useEffect } from 'react';
import { loginWithGoogle, logout, listenForAuthChanges, db } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';

export default function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // User state for authentication

  // Handle user login state change
  useEffect(() => {
    listenForAuthChanges(setUser); // Listen for auth changes and update user state
  }, []);

  const handleSubmit = async () => {
    if (text.trim() === '' || !user) return;

    setLoading(true);
    setSummary('');
    setHashtags('');

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong!');
      }

      setSummary(data.summary);
      setHashtags(data.hashtags);

      // Step 4: Store the blog post, summary, and hashtags in Firestore under the user's UID
      await setDoc(doc(db, 'users', user.uid, 'summaries', new Date().toISOString()), {
        summary: data.summary,
        hashtags: data.hashtags,
        text,
        createdAt: new Date(),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSummary(`❌ Error: ${error.message}`);
      } else {
        setSummary('❌ Unknown error occurred.');
      }
      setHashtags('');
      console.error('Frontend error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">🧠 Blog Summarizer + Hashtag Generator</h1>

      {/* Google Login / Logout */}
      {user ? (
        <div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
          <p>Welcome, {user.displayName}!</p>
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      )}

      {/* Text area for inputting blog post */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your blog post here..."
        className="w-full border rounded p-2 min-h-[150px]"
        disabled={!user} // Disable text area if not logged in
      />

      {/* Submit button for summarizing */}
      <button
        onClick={handleSubmit}
        disabled={loading || !user} // Disable if loading or not logged in
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Summarizing...' : 'Summarize & Generate Hashtags'}
      </button>

      {/* Display Summary */}
      {summary && (
        <>
          <h2 className="text-xl font-semibold">📄 Summary</h2>
          <p className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{summary}</p>
        </>
      )}

      {/* Display Hashtags */}
      {hashtags && (
        <>
          <h2 className="text-xl font-semibold">🏷️ Hashtags</h2>
          <p className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{hashtags}</p>
        </>
      )}
    </main>
  );
}

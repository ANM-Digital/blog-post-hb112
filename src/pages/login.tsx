"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../../lib/firebase/firebase-config";

const auth = getAuth(app);

export default function LoginPage() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up user
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login user
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/admin"); // Redirect to admin dashboard after success
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/admin"); // Redirect to admin dashboard after Google login
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 400px;
          margin: 4rem auto;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          font-family: system-ui, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }
        form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        button.primary {
          width: 100%;
          padding: 0.75rem;
          background-color: #3b82f6;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 1rem;
        }
        button.primary:hover {
          background-color: #2563eb;
        }
        button.google {
          width: 100%;
          padding: 0.75rem;
          background-color: #ef4444;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 1rem;
        }
        button.google:hover {
          background-color: #dc2626;
        }
        .toggle-link {
          text-align: center;
          color: #3b82f6;
          cursor: pointer;
          font-weight: 600;
          user-select: none;
        }
        .error {
          color: #dc2626;
          text-align: center;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .loading {
          text-align: center;
          margin-bottom: 1rem;
          color: #2563eb;
        }
      `}</style>

      <div className="container" role="main" aria-label="Authentication form">
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {loading && <p className="loading">Processing...</p>}

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={loading}
            aria-label="Email address"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={loading}
            aria-label="Password"
          />

          <button type="submit" className="primary" disabled={loading}>
            {isSignUp ? "Create Account" : "Log In"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="google"
          disabled={loading}
          aria-label="Sign in with Google"
        >
          Continue with Google
        </button>

        <p
          className="toggle-link"
          onClick={() => {
            setIsSignUp(!isSignUp);
            resetForm();
          }}
        >
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </>
  );
}

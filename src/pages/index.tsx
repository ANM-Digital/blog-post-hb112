"use client";

import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleVideoEnded = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {showIntro && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            zIndex: 9998, // just below login button
          }}
        >
          <video
            src="/hashtag-manager.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Login button always visible, highest z-index */}
      {!user && (
        <button
          onClick={() => router.push("/login")}
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#3b82f6cc",
            color: "white",
            cursor: "pointer",
            zIndex: 9999, // above the video overlay
          }}
          aria-label="Login"
        >
          Login
        </button>
      )}

      {/* Show main content only after video ends */}
      {!showIntro && (
        <main
          style={{
            position: "relative",
            zIndex: 10,
            color: "white",
            textAlign: "center",
            paddingTop: "40vh",
            fontSize: "2rem",
            textShadow: "0 0 8px rgba(0,0,0,0.8)",
          }}
        >
          {/* Your homepage/admin content here */}
        </main>
      )}
    </>
  );
}

// 🚫 This tells the layout NOT to show the admin sidebar
(Home as any).showAdminLayout = false;

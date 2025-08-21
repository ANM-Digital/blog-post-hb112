"use client";

import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";  // Adjust path if needed
import app from "../../lib/firebase/firebase-config";

const db = getFirestore(app);

export default function HashtagManagerPage() {
  const { user, loading } = useAuth();
  const [hashtagCount, setHashtagCount] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && user) {
      const fetchHashtags = async () => {
        try {
          const hashtagsRef = collection(db, "hashtags");
          const q = query(
            hashtagsRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "asc")
          );
          const querySnapshot = await getDocs(q);
          setHashtagCount(querySnapshot.size);
        } catch (err) {
          console.error("Error fetching hashtags:", err);
          setHashtagCount(0);
        }
      };
      fetchHashtags();
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please log in to view your hashtags.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hashtag Manager</h1>

      <section
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            backgroundColor: "#3b82f6", // Blue
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            flex: "1 1 200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Hashtags Created</h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
            {hashtagCount !== null ? hashtagCount : "Loading..."}
          </p>
          <small>Since your first hashtag</small>
        </div>

        <div
          style={{
            backgroundColor: "#facc15", // Yellow
            color: "#333",
            padding: "1.5rem",
            borderRadius: "8px",
            flex: "1 1 200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Placeholder 2</h2>
          <p>--</p>
        </div>

        <div
          style={{
            backgroundColor: "#7f1d1d", // Maroon
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            flex: "1 1 200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Placeholder 3</h2>
          <p>--</p>
        </div>

        <div
          style={{
            backgroundColor: "#22c55e", // Green
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            flex: "1 1 200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Placeholder 4</h2>
          <p>--</p>
        </div>
      </section>

      {/* Add your hashtag management UI here */}
      <div>
        <p>Manage your hashtags here...</p>
      </div>
    </div>
  );
}

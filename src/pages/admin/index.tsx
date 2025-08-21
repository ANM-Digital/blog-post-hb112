"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";

// Dynamic imports for pages
const pages = {
  dashboard: () => import("../../components/pages/Dashboard"),
  users: () => import("../../components/pages/Users"),
  settings: () => import("../../components/pages/Settings"),
  reports: () => import("../../components/pages/Reports"),
  "Article Manager" : () => import("../../components/pages/ArticleManager"),
  hashtags: () => import("../../components/pages/HashtagManager"),
  members: () => import("../../components/pages/Members"),
  pricing: () => import("../../components/pages/Pricing"),
  articles: () => import("../../components/pages/ArticleManager"),
  keywords: () => import("../../components/pages/KeywordManager"),
  charts: () => import("../../components/pages/Charts"),
  calendar: () => import("../../components/pages/Calendar"),
  auth: () => import("../../components/pages/Authentication"),
  tiers: () => import("../../components/pages/Tiers"),
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [Content, setContent] = useState<React.ComponentType>(() => () => <p>Loading...</p>);

  useEffect(() => {
    pages[activePage]()
      .then((mod) => setContent(() => mod.default))
      .catch(() => setContent(() => () => <p>Page not found.</p>));
  }, [activePage]);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "240px",
            backgroundColor: "#f9f9f9",
            padding: "1.5rem",
            borderRight: "1px solid #ddd",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Admin Menu</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {Object.keys(pages).map((key) => (
              <li key={key} style={{ marginBottom: "0.75rem" }}>
                <button
                  onClick={() => setActivePage(key)}
                  style={{
                    background: key === activePage ? "#3b82f6" : "transparent",
                    color: key === activePage ? "white" : "#333",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {key.replace(/(^|\s)\S/g, (t) => t.toUpperCase())}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            marginRight: "25px", // Makes the right side 25px narrower
          }}
        >
          {/* Header Bar */}
          <header
            style={{
              backgroundColor: "#f1f5f9",
              padding: "1rem 2rem",
              borderBottom: "1px solid #ddd",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {activePage.replace(/(^|\s)\S/g, (t) => t.toUpperCase())}
          </header>

          {/* Dynamic Page Content */}
          <section style={{ padding: "2rem", flexGrow: 1 }}>
            <Content />
          </section>
        </main>
      </div>
    </>
  );
}

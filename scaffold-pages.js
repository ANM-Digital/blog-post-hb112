const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "components", "pages");

const pages = {
  Dashboard: `export default function Dashboard() {
  return <div>📊 Welcome to the Dashboard!</div>;
}
`,
  Users: `export default function Users() {
  return <div>👥 Manage your users here.</div>;
}
`,
  Settings: `export default function Settings() {
  return <div>⚙️ Adjust your settings here.</div>;
}
`,
  Reports: `export default function Reports() {
  return <div>📈 View your reports and analytics here.</div>;
}
`,
  HashtagManager: `export default function HashtagManager() {
  return <div>🏷️ Manage your hashtags here.</div>;
}
`,
  Members: `export default function Members() {
  return <div>🧑‍🤝‍🧑 Manage members here.</div>;
}
`,
  Pricing: `export default function Pricing() {
  return <div>💲 Configure pricing plans here.</div>;
}
`,
  ArticleManager: `export default function ArticleManager() {
  return <div>📝 Manage your articles here.</div>;
}
`,
  KeywordManager: `export default function KeywordManager() {
  return <div>🔑 Manage your keywords here.</div>;
}
`,
  Charts: `export default function Charts() {
  return <div>📊 View charts and graphs here.</div>;
}
`,
  Calendar: `export default function Calendar() {
  return <div>📅 Manage your calendar here.</div>;
}
`,
  Authentication: `export default function Authentication() {
  return <div>🔐 Authentication management page.</div>;
}
`,
};

function scaffold() {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Created directory: ${baseDir}`);
  }

  for (const [name, content] of Object.entries(pages)) {
    const filePath = path.join(baseDir, `${name}.tsx`);
    const fileContent = `"use client";

${content}`;

    fs.writeFileSync(filePath, fileContent);
    console.log(`Created file: ${filePath}`);
  }
  console.log("All pages scaffolded!");
}

scaffold();

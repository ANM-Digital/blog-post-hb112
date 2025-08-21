import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', background: '#f0f0f0', padding: '1rem' }}>
        <h2>Admin Menu</h2>
        <ul>
          <li><a href="/admin">Dashboard</a></li>
          {/* Add more links here */}
        </ul>
      </nav>
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}

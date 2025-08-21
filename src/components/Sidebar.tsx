// src/components/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  // Helper to add "active" class
  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="sidebar">
      <h2>ADMIN</h2>
      <ul>
        <li>
          <Link href="/admin" legacyBehavior>
            <a className={isActive('/admin') ? 'active' : ''}>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/users" legacyBehavior>
            <a className={isActive('/admin/users') ? 'active' : ''}>Users</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/settings" legacyBehavior>
            <a className={isActive('/admin/settings') ? 'active' : ''}>Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/reports" legacyBehavior>
            <a className={isActive('/admin/reports') ? 'active' : ''}>Reports</a>
          </Link>
        </li>
        <li>
          <Link href="/hashtag-manager" legacyBehavior>
            <a className={isActive('/hashtag-manager') ? 'active' : ''}>Hashtags</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0; top: 0; bottom: 0;
          width: 220px;
          background: #1e293b;
          color: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 8px #0001;
          padding-top: 1rem;
        }
        h2 {
          margin: 0;
          padding: 1.5rem 1rem 1rem 1rem;
          font-size: 1.1rem;
          letter-spacing: 2px;
          font-weight: 700;
          border-bottom: 1px solid #334155;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          margin: 0;
        }
        a {
          display: block;
          padding: 0.75rem 1.25rem;
          color: #cbd5e1;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: background 0.2s, border-color 0.2s;
          cursor: pointer;
        }
        a:hover, a.active {
          background: #334155;
          border-left: 3px solid #38bdf8;
          color: #fff;
        }
      `}</style>
    </nav>
  );
}

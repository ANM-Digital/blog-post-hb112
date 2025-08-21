import 'src/styles/newAdminStyles1.css';
import type { AppProps } from 'next/app';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../lib/firebase/firebase-config';
import { useRouter } from 'next/router';

// Optionally keep this if you're using AdminLayout for NON-admin pages
import AdminLayout from '../components/AdminLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const handleUnload = () => {
      if (auth.currentUser) {
        signOut(auth).catch((err) => {
          console.error('Error signing out on unload:', err);
        });
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // ✅ Don't wrap admin pages with AdminLayout
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <>
      {isAdminPage ? (
        <Component {...pageProps} />
      ) : (
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      )}
    </>
  );
}

// src/components/UserStatus.tsx
"use client";

import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserStatus = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading auth...</p>;

  return (
    <div>
      {user ? (
        <p>✅ Logged in as: {user.email}</p>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
};

export default UserStatus;

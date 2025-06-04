// AuthContext.js: 사용자 로그인 상태 및 권한 관리
import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.email.includes("1")) setTeam("1팀");
      else if (user?.email.includes("2")) setTeam("2팀");
      else if (user?.email.includes("3")) setTeam("3팀");
      else if (user?.email.includes("4")) setTeam("4팀");
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, team }}>
      {children}
    </AuthContext.Provider>
  );
};
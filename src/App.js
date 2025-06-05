import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';
import RoleManager from './RoleManager';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  const { user, role } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (showRegister) return <Register onBack={() => setShowRegister(false)} />;
  if (!user) return <Login onRegister={() => setShowRegister(true)} />;
  if (!role) return <div>로딩 중...</div>;

  return (
    <div>
      <div style={{ textAlign: 'right', padding: 10 }}>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <Calendar />
      {(role === "마스터" || role === "관리자") && <RoleManager />}
    </div>
  );
}
export default App;
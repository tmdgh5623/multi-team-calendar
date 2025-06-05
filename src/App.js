import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';
import RoleManager from './RoleManager';

function App() {
  const { user, role } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) return <Register onBack={() => setShowRegister(false)} />;
  if (!user) return <Login onRegister={() => setShowRegister(true)} />;
  if (!role) return <div>로딩 중...</div>;

  return (
    <div>
      <Calendar />
      {role === "마스터" && <RoleManager />}
    </div>
  );
}
export default App;
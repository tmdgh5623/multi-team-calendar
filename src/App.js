import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';
import RoleManager from './RoleManager';

function App() {
  const { user, role } = useContext(AuthContext);

  if (!user) return <Login />;
  if (!role) return <Register />;

  return (
    <div>
      <Calendar />
      {role === "마스터" && <RoleManager />}
    </div>
  );
}
export default App;
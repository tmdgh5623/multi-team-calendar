import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Register from './Register';
import Calendar from './Calendar';

function App() {
  const { user, role } = useContext(AuthContext);
  if (!user) return <Login />;
  if (!role) return <Register />;
  return <Calendar />;
}
export default App;
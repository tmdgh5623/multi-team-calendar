import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Login from './Login';
import Calendar from './Calendar';

function App() {
  const { user } = useContext(AuthContext);
  return user ? <Calendar /> : <Login />;
}
export default App;
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

function Login({ onRegister }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
    } catch {
      alert('로그인 실패');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h2>로그인</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
      <br />
      <button onClick={onRegister}>회원가입</button>
    </div>
  );
}
export default Login;
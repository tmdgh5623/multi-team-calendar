import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pw);
    } catch (e) {
      alert('로그인 실패');
    }
  };
  return (
    <div>
      <h2>로그인</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
export default Login;
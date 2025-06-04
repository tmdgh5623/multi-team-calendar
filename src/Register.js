import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [role, setRole] = useState('일반');

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pw);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role
      });
    } catch {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="마스터">마스터</option>
        <option value="관리자">관리자</option>
        <option value="일반">일반</option>
      </select>
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}
export default Register;
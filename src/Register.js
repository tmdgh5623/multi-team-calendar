import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

function Register({ onBack }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pw);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role: "일반"
      });
      alert("회원가입 성공! 다시 로그인 해주세요.");
      onBack();
    } catch {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button onClick={handleRegister}>회원가입</button>
      <button onClick={onBack}>뒤로가기</button>
    </div>
  );
}
export default Register;
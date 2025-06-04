import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function RoleManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    loadUsers();
  }, []);

  const handleChange = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
    alert("권한이 변경되었습니다.");
  };

  return (
    <div>
      <h3>사용자 권한 관리</h3>
      {users.map(user => (
        <div key={user.id}>
          {user.email} - 현재: {user.role}
          <select value={user.role} onChange={(e) => handleChange(user.id, e.target.value)}>
            <option value="일반">일반</option>
            <option value="관리자">관리자</option>
            <option value="마스터">마스터</option>
          </select>
        </div>
      ))}
    </div>
  );
}
export default RoleManager;
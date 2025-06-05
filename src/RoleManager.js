import React, { useEffect, useState, useContext } from 'react';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';

function RoleManager() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

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
      {users.map(u => (
        <div key={u.id}>
          <b>{u.name}</b> ({u.email}) - 현재: {u.role}
          <select value={u.role} onChange={(e) => handleChange(u.id, e.target.value)}>
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
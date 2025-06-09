import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function SummaryList() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ 대상처명: "", 거래처명: "", 연락처: "", 유형: "" });

  const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, "summary"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "summary"), form);
    setForm({ 대상처명: "", 거래처명: "", 연락처: "", 유형: "" });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h2>총괄 리스트</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="대상처명" value={form.대상처명} onChange={e => setForm({...form, 대상처명: e.target.value})} />
        <input placeholder="거래처명" value={form.거래처명} onChange={e => setForm({...form, 거래처명: e.target.value})} />
        <input placeholder="연락처" value={form.연락처} onChange={e => setForm({...form, 연락처: e.target.value})} />
        <input placeholder="유형" value={form.유형} onChange={e => setForm({...form, 유형: e.target.value})} />
        <button type="submit">추가</button>
      </form>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>대상처명</th><th>거래처명</th><th>연락처</th><th>유형</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.id}>
              <td>{item.대상처명}</td>
              <td>{item.거래처명}</td>
              <td>{item.연락처}</td>
              <td>{item.유형}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
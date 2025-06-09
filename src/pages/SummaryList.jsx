import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

export default function SummaryList() {
  const [list, setList] = useState([]);
  const [teamFilter, setTeamFilter] = useState("1팀");
  const [form, setForm] = useState({
    팀: "1팀", 대상처명: "", 거래처명: "", 연락처: "", 유형: ""
  });

  const loadData = async () => {
    const q = query(collection(db, "summary"), where("팀", "==", teamFilter));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "summary"), form);
    setForm({ ...form, 대상처명: "", 거래처명: "", 연락처: "", 유형: "" });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [teamFilter]);

  return (
    <div>
      <h2>총괄 리스트 관리</h2>
      <div>
        <label>팀 선택: </label>
        <select value={teamFilter} onChange={e => {
          setTeamFilter(e.target.value);
          setForm(prev => ({ ...prev, 팀: e.target.value }));
        }}>
          <option value="1팀">1팀</option>
          <option value="2팀">2팀</option>
          <option value="3팀">3팀</option>
          <option value="4팀">4팀</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <input placeholder="대상처명" value={form.대상처명} onChange={e => setForm({...form, 대상처명: e.target.value})} />
        <input placeholder="거래처명" value={form.거래처명} onChange={e => setForm({...form, 거래처명: e.target.value})} />
        <input placeholder="연락처" value={form.연락처} onChange={e => setForm({...form, 연락처: e.target.value})} />
        <input placeholder="유형" value={form.유형} onChange={e => setForm({...form, 유형: e.target.value})} />
        <button type="submit">추가</button>
      </form>
      <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>팀</th><th>대상처명</th><th>거래처명</th><th>연락처</th><th>유형</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.id}>
              <td>{item.팀}</td>
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
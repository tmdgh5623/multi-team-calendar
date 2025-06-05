import React, { useState } from 'react';

export default function SummaryList() {
  const [rows, setRows] = useState([
    { id: 1, 대상처명: 'A건물', 거래처명: '가람소방', 연락처: '010-1234-5678', 유형: '월점검' },
    { id: 2, 대상처명: 'B빌딩', 거래처명: '한빛기술', 연락처: '010-2222-3333', 유형: '단타' }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>총괄 리스트</h3>
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>대상처명</th>
            <th>거래처명</th>
            <th>연락처</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.대상처명}</td>
              <td>{row.거래처명}</td>
              <td>{row.연락처}</td>
              <td>{row.유형}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
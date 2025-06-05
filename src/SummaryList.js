import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function SummaryList() {
  const [rows, setRows] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setRows(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const addRow = () => {
    setRows([...rows, { 번호: rows.length + 1, 대상처명: '', 거래처명: '', 연락처: '', 유형: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>총괄 리스트</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={addRow}>행 추가</button>
      <table border="1" cellPadding="5" style={{ marginTop: 10, width: '100%', borderCollapse: 'collapse' }}>
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
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.번호 || idx + 1}</td>
              <td><input value={row.대상처명} onChange={(e) => handleChange(idx, '대상처명', e.target.value)} /></td>
              <td><input value={row.거래처명} onChange={(e) => handleChange(idx, '거래처명', e.target.value)} /></td>
              <td><input value={row.연락처} onChange={(e) => handleChange(idx, '연락처', e.target.value)} /></td>
              <td><input value={row.유형} onChange={(e) => handleChange(idx, '유형', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
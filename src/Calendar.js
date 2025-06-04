import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Calendar() {
  const { role } = useContext(AuthContext);
  return (
    <div>
      <h3>캘린더 페이지</h3>
      <p>현재 사용자 권한: {role}</p>
    </div>
  );
}
export default Calendar;
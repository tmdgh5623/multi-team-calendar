// App.js: 팀별 일정 입력 UI
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { saveSchedule, getSchedule } from './ScheduleService';

const teams = ['1팀', '2팀', '3팀', '4팀'];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const MAX_PER_DAY = 4;

function App() {
  const { user, team } = useContext(AuthContext);
  const [activeTeam, setActiveTeam] = useState(team || '1팀');
  const [schedule, setSchedule] = useState({});

  const load = async () => {
    const data = await getSchedule(activeTeam);
    setSchedule(data);
  };

  const addTask = async (day) => {
    const input = prompt(`${activeTeam} - ${day}일 일정 입력`);
    if (!input) return;

    const key = `${activeTeam}-${day}`;
    const tasks = schedule[key] || [];

    if (tasks.length >= MAX_PER_DAY) {
      alert("해당 날짜는 최대 4개까지만 입력 가능합니다.");
      return;
    }

    const updated = { ...schedule, [key]: [...tasks, input] };
    setSchedule(updated);
    await saveSchedule(activeTeam, day, updated[key]);
  };

  useEffect(() => {
    load();
  }, [activeTeam]);

  if (!user) return <div>로그인이 필요합니다.</div>;

  return (
    <div>
      <h2>{user.email}님, 팀: {activeTeam}</h2>
      <div>
        {teams.map((t) => (
          <button key={t} onClick={() => setActiveTeam(t)}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '420px' }}>
        {days.map((day) => {
          const key = `${activeTeam}-${day}`;
          return (
            <div
              key={day}
              onClick={() => addTask(day)}
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid gray',
                margin: '2px',
                padding: '4px',
                cursor: 'pointer',
              }}
            >
              <strong>{day}</strong>
              <ul style={{ fontSize: '10px', padding: 0, margin: 0 }}>
                {(schedule[key] || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
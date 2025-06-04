import React, { useState } from 'react';

const teams = ['1팀', '2팀', '3팀', '4팀'];
const days = Array.from({ length: 30 }, (_, i) => i + 1);
const MAX_PER_DAY = 4;

function App() {
  const [activeTeam, setActiveTeam] = useState('1팀');
  const [schedule, setSchedule] = useState({});

  const addTask = (day) => {
    const input = prompt(`일정 입력 (날짜 ${day})`);
    if (!input) return;

    const key = `${activeTeam}-${day}`;
    const tasks = schedule[key] || [];

    if (tasks.length >= MAX_PER_DAY) {
      alert("이 날짜에는 최대 4개의 일정만 입력할 수 있습니다.");
      return;
    }

    const updated = { ...schedule, [key]: [...tasks, input] };
    setSchedule(updated);
  };

  return (
    <div>
      <h2>팀별 일정관리 캘린더</h2>
      <div>
        {teams.map((team) => (
          <button key={team} onClick={() => setActiveTeam(team)} style={{ margin: 5 }}>
            {team}
          </button>
        ))}
      </div>
      <h3>{activeTeam} 일정</h3>
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
              <ul style={{ fontSize: '10px', margin: 0, padding: 0 }}>
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
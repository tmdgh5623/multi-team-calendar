import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const teamNames = ["1팀", "2팀", "3팀", "4팀"];
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();

export default function CalendarPage() {
  const [selectedTeam, setSelectedTeam] = useState("1팀");
  const [events, setEvents] = useState([]);
  const [dayInput, setDayInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const allEvents = querySnapshot.docs.map(doc => doc.data());
    setEvents(allEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!dayInput || !contentInput) return;
    const newEvent = {
      team: selectedTeam,
      date: `${currentYear}-${currentMonth + 1}-${dayInput}`,
      content: contentInput
    };
    await addDoc(collection(db, "events"), newEvent);
    setContentInput("");
    fetchEvents();
  };

  const renderCalendar = () => {
    return (
      <div>
        <h3>{selectedTeam} - {currentYear}년 {currentMonth + 1}월</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
          {[...Array(daysInMonth)].map((_, day) => {
            const dateStr = `${currentYear}-${currentMonth + 1}-${day + 1}`;
            const dayEvents = events.filter(e => e.team === selectedTeam && e.date === dateStr);
            return (
              <div key={day} style={{ border: "1px solid #ccc", padding: "5px" }}>
                <strong>{day + 1}일</strong>
                <ul>
                  {dayEvents.map((ev, idx) => (
                    <li key={idx}>{ev.content}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>월별 캘린더</h2>
      <div>
        {teamNames.map(name => (
          <button key={name} onClick={() => setSelectedTeam(name)} style={{ marginRight: "10px" }}>
            {name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <input type="number" placeholder="날짜 (1~31)" value={dayInput} onChange={e => setDayInput(e.target.value)} />
        <input type="text" placeholder="일정 내용" value={contentInput} onChange={e => setContentInput(e.target.value)} />
        <button onClick={handleAddEvent}>일정 추가</button>
      </div>
      <div style={{ marginTop: "20px" }}>{renderCalendar()}</div>
    </div>
  );
}
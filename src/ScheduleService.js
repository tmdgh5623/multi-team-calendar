// ScheduleService.js: 일정 Firebase Firestore 연동
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getSchedule = async (team) => {
  const ref = doc(db, "schedules", team);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : {};
};

export const saveSchedule = async (team, day, data) => {
  const ref = doc(db, "schedules", team);
  const current = await getSchedule(team);
  await setDoc(ref, { ...current, [`${team}-${day}`]: data });
};
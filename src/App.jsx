import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SummaryList from './pages/SummaryList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SummaryList />} />
      </Routes>
    </BrowserRouter>
  );
}
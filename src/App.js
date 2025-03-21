import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TicketList from './components/TicketList';
import AddTicketForm from './components/AddTicketForm';
import EditTicketForm from './components/EditTicketForm';

function App() {
  return (
        <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/add-ticket" element={<AddTicketForm />} />
            <Route path="/update/:ticketId" element={<EditTicketForm />} />
          </Routes>
        </div>
  );
}

export default App;

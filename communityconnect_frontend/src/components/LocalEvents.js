import React, { useState, useEffect } from 'react';
import './LocalEvents.css';

// PUBLIC_INTERFACE
/**
 * LocalEvents - displays, adds, and deletes community events stored locally.
 */
function LocalEvents() {
  const LS_KEY = "cc-local-events";
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", desc: "" });

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setEvents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(events));
  }, [events]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.date.trim()) return;
    setEvents(ev => [...ev, { ...form }]);
    setForm({ name: "", date: "", desc: "" });
  }

  function handleDelete(i) {
    setEvents(ev => ev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="local-events card">
      <h2>
        <span role="img" aria-label="events">📅</span> Local Events
      </h2>
      <form className="events-form" onSubmit={handleSubmit} autoComplete="off">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Event name" className="events-input" />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="events-input" />
        <input name="desc" value={form.desc} onChange={handleChange} placeholder="Description" className="events-input" />
        <button className="btn" type="submit">Add</button>
      </form>
      <ul className="events-list">
        {events.length === 0 && <li style={{ opacity: 0.8 }}>No upcoming events.</li>}
        {events.map((ev, i) => (
          <li key={i} className="events-item">
            <span className="event-title">{ev.name}</span>
            <span className="event-date">{ev.date}</span>
            <span className="event-desc">{ev.desc}</span>
            <button className="btn events-delete" title="Delete" onClick={() => handleDelete(i)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalEvents;

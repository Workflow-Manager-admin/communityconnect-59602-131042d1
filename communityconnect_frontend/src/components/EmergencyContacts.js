import React, { useState, useEffect } from 'react';
import './EmergencyContacts.css';

// PUBLIC_INTERFACE
/**
 * EmergencyContacts displays, adds, and deletes locally stored emergency contacts.
 */
function EmergencyContacts() {
  const LS_KEY = "cc-emergency-contacts";
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", number: "" });

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.number.trim()) return;
    setContacts(c => [...c, { ...form }]);
    setForm({ name: "", number: "" });
  }

  function handleDelete(i) {
    setContacts(c => c.filter((_, idx) => idx !== i));
  }

  return (
    <div className="emergency-contacts card">
      <h2>
        <span role="img" aria-label="emergency">🚨</span> Emergency Contacts
      </h2>
      <form className="contacts-form" onSubmit={handleSubmit} autoComplete="off">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="contacts-input" autoComplete="no" />
        <input name="number" value={form.number} onChange={handleChange} placeholder="Phone" className="contacts-input" autoComplete="no" />
        <button className="btn" type="submit">Add</button>
      </form>
      <ul className="contacts-list">
        {contacts.length === 0 && <li style={{ opacity: 0.8 }}>No contacts saved.</li>}
        {contacts.map((c, i) => (
          <li key={i} className="contacts-item">
            <span>{c.name}: </span>
            <a href={`tel:${c.number}`} className="contacts-number">{c.number}</a>
            <button className="btn contacts-delete" title="Delete" onClick={() => handleDelete(i)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmergencyContacts;

import React from 'react';
import './App.css';
import NewsSection from './components/NewsSection';
import WeatherWidget from './components/WeatherWidget';
import EmergencyContacts from './components/EmergencyContacts';
import LocalEvents from './components/LocalEvents';

/**
 * PUBLIC_INTERFACE
 * Main App component for CommunityConnect
 */
function App() {
  return (
    <div className="app community-connect-dark">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: 'var(--primary-color)' }}>⦿</span> CommunityConnect
            </div>
            <div style={{ color: "#fff", opacity: 0.9, fontWeight: 500 }}>Connect. Inform. Empower.</div>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <div className="container sections-grid">
          <section className="main-area">
            <NewsSection />
            <LocalEvents />
          </section>
          <aside className="side-area">
            <WeatherWidget />
            <EmergencyContacts />
          </aside>
        </div>
      </main>
      <footer className="footer">
        <span>CommunityConnect &copy; {new Date().getFullYear()} | Built with ❤️</span>
      </footer>
    </div>
  );
}

export default App;

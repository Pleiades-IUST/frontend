import React from 'react';
import './Sessions.css';

const Sessions = ({ sessions, selectedSessionId, setSession }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <div className="header-icon">✨</div>
          <h2 className="sidebar-title">Sessions</h2>
        </div>
        <div className="header-glow"></div>
      </div>

      <div className="session-container">
        <ul className="session-list">
          {sessions.map((session, index) => (
            <li
              key={session.id}
              className={`session-item ${
                selectedSessionId === session.id ? 'active' : ''
              }`}
              onClick={() => setSession(session.id)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="session-content">
                <div className="session-header">
                  <div className="session-icon">💬</div>
                  <span className="session-name">{session.name}</span>
                </div>
                <div className="session-meta">
                  <div className="meta-icon">🕒</div>
                  <span className="session-date">{session.created_at}</span>
                </div>
              </div>
              <div className="session-glow"></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sessions;

import React from 'react';
import './Sessions.css';

const Sessions = ({ sessions, selectedSessionId, setSession }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Sessions</h2>
      <ul className="session-list">
        {sessions.map((session) => (
          <li
            key={session.id}
            className={`session-item ${
              selectedSessionId === session.id ? 'active' : ''
            }`}
            onClick={() => setSession(session.id)}
          >
            {session.name}
            <p>{session.created_at}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sessions;

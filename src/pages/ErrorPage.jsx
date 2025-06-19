import React, { useState, useEffect } from 'react';
import './ErrorPage.css'; // Make sure to import the CSS file

function ErrorPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: (particle.y + particle.speed) % 110,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.5,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="error-container" onMouseMove={handleMouseMove}>
      {/* Animated Background Gradient */}
      <div
        className="background-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `pulse ${2 + (particle.id % 3)}s infinite alternate`,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="geometric-shape-1" />
      <div className="geometric-shape-2" />

      {/* Main Content */}
      <div className="main-content">
        {/* Glowing 404 */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <h1 className="title-404">404</h1>
          <div className="title-404-shadow">404</div>
        </div>

        {/* Error Icon with Animation */}
        <div className="error-icon-container">
          <div className="error-icon">
            <div className="error-icon-main">
              <span>!</span>
            </div>
            <div className="error-icon-ping" />
          </div>
        </div>

        {/* Main Message */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="main-title">Oops! Page Not Found</h2>
          <p className="subtitle">
            <span className="subtitle-highlight">
              don't worry, we'll help you find your way back!
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="buttons-container">
          <button onClick={handleGoHome} className="action-button button-home">
            <span style={{ fontSize: '1.25rem' }}>🏠</span>
            Go Home
            <div className="button-overlay" />
          </button>

          <button onClick={handleGoBack} className="action-button button-back">
            <span style={{ fontSize: '1.25rem' }}>←</span>
            Go Back
            <div className="button-overlay" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

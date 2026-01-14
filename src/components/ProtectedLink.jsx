'use client';
import { useState, useEffect } from 'react';

export default function ProtectedLink({ href, children, className, onClick, onAuthRequired }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('mineclaw_current_user');
    setIsAuthenticated(!!user);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    
    const user = localStorage.getItem('mineclaw_current_user');
    
    if (user) {
      // User is authenticated, navigate
      window.location.href = href;
    } else {
      // User not authenticated, trigger modal
      if (onAuthRequired) {
        onAuthRequired(href);
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
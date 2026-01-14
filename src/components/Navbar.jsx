'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModel';
import ProtectedLink from '@/components/ProtectedLink';
import styles from '@/styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('mineclaw_current_user');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('mineclaw_current_user');
    setUser(null);
    setShowDropdown(false);
    router.push('/');
  };

  const handleAuthRequired = (path) => {
    setRedirectPath(path);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>Mineclaw</span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <ProtectedLink 
            href="/about=mc" 
            className={styles.navLink}
            onAuthRequired={handleAuthRequired}
          >
            About
          </ProtectedLink>
          <ProtectedLink 
            href="/articles=mc" 
            className={styles.navLink}
            onAuthRequired={handleAuthRequired}
          >
            Articles
          </ProtectedLink>
          <ProtectedLink 
            href="/resources=mc" 
            className={styles.navLink}
            onAuthRequired={handleAuthRequired}
          >
            Resources
          </ProtectedLink>
          <ProtectedLink 
            href="/contact=mc" 
            className={styles.navLink}
            onAuthRequired={handleAuthRequired}
          >
            Contact
          </ProtectedLink>
          <a href="tel:1-800-662-4357" className={styles.emergencyBtn}>
            🆘 Get Help
          </a>
          
          {user ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.userBtn}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className={styles.userAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span>{user.name}</span>
              </button>
              
              {showDropdown && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className={styles.loginBtn}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuBtn}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink} onClick={toggleMenu}>
            Home
          </Link>
          <ProtectedLink 
            href="/about=mc" 
            className={styles.mobileLink}
            onClick={toggleMenu}
            onAuthRequired={handleAuthRequired}
          >
            About
          </ProtectedLink>
          <ProtectedLink 
            href="/articles=mc" 
            className={styles.mobileLink}
            onClick={toggleMenu}
            onAuthRequired={handleAuthRequired}
          >
            Articles
          </ProtectedLink>
          <ProtectedLink 
            href="/resources=mc" 
            className={styles.mobileLink}
            onClick={toggleMenu}
            onAuthRequired={handleAuthRequired}
          >
            Resources
          </ProtectedLink>
          <ProtectedLink 
            href="/contact=mc" 
            className={styles.mobileLink}
            onClick={toggleMenu}
            onAuthRequired={handleAuthRequired}
          >
            Contact
          </ProtectedLink>
          <a href="tel:1-800-662-4357" className={styles.mobileEmergency}>
            🆘 Get Help Now
          </a>
          
          {user ? (
            <div className={styles.mobileUser}>
              <div className={styles.mobileUserInfo}>
                <span className={styles.mobileAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className={styles.mobileUserName}>{user.name}</p>
                  <p className={styles.mobileUserEmail}>{user.email}</p>
                </div>
              </div>
              <button onClick={handleLogout} className={styles.mobileLogout}>
                🚪 Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                toggleMenu();
                setShowAuthModal(true);
              }} 
              className={styles.mobileLogin}
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={closeAuthModal}
        redirectPath={redirectPath}
      />
    </nav>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('mineclaw_current_user');
    if (user) {
      // Redirect to home if already authenticated
      router.push('/');
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem('mineclaw_users') || '[]');
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Store logged in user
        localStorage.setItem('mineclaw_current_user', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setErrors({ email: 'Invalid email or password' });
      }
    } else {
      // Signup logic
      const users = JSON.parse(localStorage.getItem('mineclaw_users') || '[]');
      
      // Check if email already exists
      if (users.some(u => u.email === formData.email)) {
        setErrors({ email: 'Email already registered' });
        return;
      }

      // Add new user
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('mineclaw_users', JSON.stringify(users));
      
      // Auto login after signup
      localStorage.setItem('mineclaw_current_user', JSON.stringify({
        name: formData.name,
        email: formData.email
      }));

      setMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.brandSection}>
            <h1 className={styles.brandLogo}>
              <span>🛡️</span> Mineclaw
            </h1>
            <p className={styles.brandTagline}>
              Building drug-free communities through education, support, and hope
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>24/7 Crisis Support</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Evidence-Based Resources</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Community Support Network</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✓</span>
                <span>Confidential & Safe</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={styles.formSubtitle}>
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Join our community and start your journey'}
            </p>

            {message && (
              <div className={styles.successMessage}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className={styles.error}>{errors.name}</span>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className={styles.error}>{errors.password}</span>
                )}
              </div>

              {!isLogin && (
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <span className={styles.error}>{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {isLogin && (
                <div className={styles.forgotPassword}>
                  <a href="#">Forgot Password?</a>
                </div>
              )}

              <button type="submit" className={styles.submitBtn}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <p className={styles.toggleText}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={toggleMode} className={styles.toggleBtn}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            <div className={styles.disclaimer}>
              <p>
                By continuing, you agree to our Terms of Service and Privacy Policy. 
                All information is kept confidential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
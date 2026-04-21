'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

const DEMO_EMAIL = 'demo@jobsrus.com';
const DEMO_PASSWORD = 'password123';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSignIn() {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      document.cookie = 'jru_auth=1; path=/; max-age=86400';
      router.push('/');
    } else {
      setError('Incorrect email or password. Try the demo credentials below.');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>Jobs R Us</div>

        <h2>Sign in</h2>
        <p>Stay updated on your professional world</p>

        <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
          <label>Email or phone</label>
          <input
            type="email"
            placeholder="Email or phone"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.forgot}>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className={styles.btn}>Sign in</button>

          <div className={styles.divider}><span>or</span></div>

        </form>

        <div className={styles.demoHint}>
          <strong>Demo credentials</strong><br />
          Email: {DEMO_EMAIL}<br />
          Password: {DEMO_PASSWORD}
        </div>
        
      </div>
    </div>
  );
}

import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <h2>Jobs R Us</h2>
      <div className={styles.navLinks}>
        <Link href="/analytics">Analytics</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
        <Link href="/references">References</Link>
      </div>
    </div>
  );
}

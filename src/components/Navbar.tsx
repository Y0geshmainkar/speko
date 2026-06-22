import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>🎙 Speako</NavLink>
      <div className={styles.links}>
        <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>
          Record
        </NavLink>
        <NavLink to="/notes" className={({ isActive }) => isActive ? styles.active : ''}>
          Notes
        </NavLink>
      </div>
    </nav>
  );
}

import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const NAV_ITEMS = [
  { to: '/', label: 'Record', icon: '🎙', end: true },
  { to: '/notes', label: 'Notes', icon: '📋', end: false },
  { to: '/settings', label: 'Settings', icon: '⚙️', end: false },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return `${styles.link} ${isActive ? styles.active : ''}`;
}

function bottomClass({ isActive }: { isActive: boolean }) {
  return `${styles.bottomLink} ${isActive ? styles.bottomActive : ''}`;
}

export default function Navbar() {
  return (
    <>
      {/* Desktop top nav */}
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <NavLink to="/" className={styles.logo} aria-label="Speako home">
          🎙 Speako
        </NavLink>
        <div className={styles.links}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={linkClass}
              aria-current={undefined}
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>{label}</span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className={styles.bottomNav} role="navigation" aria-label="Mobile navigation">
        {NAV_ITEMS.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end} className={bottomClass}>
            {({ isActive }) => (
              <>
                <span aria-hidden="true">{icon}</span>
                <span aria-current={isActive ? 'page' : undefined}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

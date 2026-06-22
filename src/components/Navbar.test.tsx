import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function renderNav(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders all nav items', () => {
    renderNav();
    expect(screen.getAllByText('Record').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Notes').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0);
  });

  it('has role=navigation', () => {
    renderNav();
    expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
  });

  it('marks Record as active on /', () => {
    renderNav('/');
    const active = screen.getAllByText('Record').find(
      (el) => el.getAttribute('aria-current') === 'page'
    );
    expect(active).toBeTruthy();
  });

  it('marks Notes as active on /notes', () => {
    renderNav('/notes');
    const active = screen.getAllByText('Notes').find(
      (el) => el.getAttribute('aria-current') === 'page'
    );
    expect(active).toBeTruthy();
  });
});

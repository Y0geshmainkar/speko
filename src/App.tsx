import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store, persistor } from '@/app/store';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import NotesList from '@/pages/NotesList';
import NoteDetail from '@/pages/NoteDetail';
import Settings from '@/pages/Settings';
import '@/styles/global.scss';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/speko">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

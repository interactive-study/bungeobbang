import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import BungeobbangMaker from './pages/maker';
import BungeobbangMold from './pages/mold';
import BungeobbangSlides from './pages/slides';
import './styles/fonts.css';
import './styles/globals.css';
import './styles/animations.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/slides'} />,
  },
  {
    path: '/slides',
    Component: BungeobbangSlides,
  },
  {
    path: '/mold',
    Component: BungeobbangMold,
  },
  {
    path: '/maker',
    Component: BungeobbangMaker,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

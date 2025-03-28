import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import BungeobbangSlides from './pages/BungeobbangSlides.tsx';
import BungeobbangMold from './pages/BungeobbangMold.tsx';

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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

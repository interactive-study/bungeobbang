import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import BungeobbangMaker from './pages/maker';
import BungeobbangMold from './pages/mold';
import BungeobbangSlides from './pages/slides';
import './styles/fonts.css';
import './styles/globals.css';
import './styles/animations.css';
import Home from './pages/home';
import Navigator from './components/Navigator';
import RootLayout from './pages/layout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '',
        element: (
          <>
            <Outlet />
            <Navigator />
          </>
        ),
        children: [
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
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

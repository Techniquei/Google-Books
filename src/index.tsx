import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { Provider} from 'react-redux'
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LibraryPage } from './pages/LibraryPage';
import { DetailPage } from './pages/DetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LibraryPage />
      },
      {
        path: 'detailed/:id',
        element: <DetailPage />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}  />
  </Provider>
);

reportWebVitals();

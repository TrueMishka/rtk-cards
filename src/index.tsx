import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import './index.css';
import App from 'app/App';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from 'common/router/router';
import { GlobalError } from 'common/GlobalError/GlobalError';
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalError/>
        <App/>
        {/*<RouterProvider router={router}/>*/}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

import { createHashRouter} from 'react-router-dom';
import { Login } from 'features/auth/Login/Login';
import { Register } from 'features/auth/Register/Register';
import { CheckEmail } from 'features/auth/CheckEmail/CheckEmail';
import { ForgotPassword } from 'features/auth/ForgotPassword/ForgotPassword';
import { Cards } from 'features/cards/Cards';
import { Learn } from 'features/cards/Learn';
import { Packs } from 'features/packs/Packs/Packs';
import { Profile } from 'features/profile/Profile';
import React from 'react';
import App from 'app/App';

export const router = createHashRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <div>ERROR</div>,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword/>
      },
      {
        path: 'check-email',
        element: <CheckEmail/>
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: 'cards',
        element: <Cards/>
      },
      {
        path: 'learn',
        element: <Learn/>
      },
      {
        path: 'packs',
        element: <Packs/>
      }
    ]
  }
])
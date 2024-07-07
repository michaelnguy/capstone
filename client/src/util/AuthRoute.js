import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

// export function AuthRoute({ component: Component, ...rest }) {
//   const { user } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? <Navigate to='/' /> : <Component {...props} />
//       }
//     />
//   );
// }

export function GuardRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return !user ? <Navigate to='/login' /> : <Outlet />;
}

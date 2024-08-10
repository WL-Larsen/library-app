import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';

const SecureRoute = ({ element }) => {
  const { authState } = useOktaAuth();

  if (authState === undefined || authState === null) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? element : <Navigate to="/login" />;
};

export default SecureRoute;
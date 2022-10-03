import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const token = useSelector(state => state.token);

  return (
    <Route 
      {...rest} 
      render={() => (
        token ? 
          <Component {...rest.props} /> :
          <Redirect to="/login" />
      )}
    />
  )
}

export default PrivateRoute;

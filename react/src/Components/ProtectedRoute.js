import React from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    let history = useHistory();

    if (rest.user === false) {// auth check, if false, direct user to login page
        history.push('/');
    }

    return (
        <Route {...rest} render={
            props => <Component {...rest} {...props} />
        } />
    )
}

export default ProtectedRoute;
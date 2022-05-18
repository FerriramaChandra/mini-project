import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({ path, component }) => {

    const isLogin = useSelector((state) => state.user.isLogin)
    if (!isLogin) {
        return <Redirect to="/Login" />;
    }

    return <Route path={path} component={component} />;
};

export default PrivateRoute
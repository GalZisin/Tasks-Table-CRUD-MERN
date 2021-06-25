import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }: any) => {

    const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props: any) => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/' />
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect to="/" />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute;
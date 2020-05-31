import {Route, Redirect} from "react-router-dom";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "./store";
import {RouteProps} from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
    user: state.auth.user,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export interface ProtectedRouteProps extends PropsFromRedux, RouteProps {
    children?: React.ReactNode,
    isAdmin?: boolean
}

const PrivateRoute = ({user, children, isAdmin = false, ...rest}: ProtectedRouteProps) => {
    if (user) {
        if (user.role !== 'admin' && isAdmin) {
            return (<Route
                path={rest.path}
                render={({location}) =>
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                }
            />)
        }
        return (<Route
            {...rest}
            render={() => children}
        />)
    } else {
        return (<Route
            path={rest.path}
            render={({location}) =>
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: {from: location}
                    }}
                />
            }
        />)
    }
};


export default connector(PrivateRoute);
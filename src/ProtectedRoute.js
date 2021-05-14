import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "./service"

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/logowanie" />
                }
            }}
        />
    )
}

export default ProtectedRoute

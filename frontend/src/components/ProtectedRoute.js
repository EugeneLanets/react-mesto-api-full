import { Redirect, Route } from "react-router"

const ProtectedRoute = ({loggedIn, component: Component, ...props}) => {
  return (
    <Route>
      { () =>
        loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  )
}

export default ProtectedRoute;
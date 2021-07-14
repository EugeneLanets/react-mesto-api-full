import { Redirect, Route } from "react-router"

const ProtectedRoute = ({loggedIn, component: Component, ...props}) => {
  return (
    <Route>
      { () =>
        loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;
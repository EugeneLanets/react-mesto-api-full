import { Link, useLocation } from "react-router-dom"

const HeaderLink = () => {
  const location = useLocation();
  
  const locationMap = {
    "/signin": {
      name: "Регистрация",
      path: "signup"
    },
    "/signup": {
      name: "Войти",
      path: "signin"
    },
    "/": {
      name: "",
      path: ""
    }
  }

  const {name, path} = locationMap[location.pathname];

  return (
    <Link 
      to={path}
      className="link"
    >{name}</Link>
  )
}

export default HeaderLink;
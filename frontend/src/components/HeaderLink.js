import { Link, useLocation } from "react-router-dom"

const HeaderLink = () => {
  const location = useLocation();
  
  const locationMap = {
    "/sign-in": {
      name: "Регистрация",
      path: "sign-up"
    },
    "/sign-up": {
      name: "Войти",
      path: "sign-in"
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
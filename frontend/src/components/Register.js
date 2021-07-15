import { Link } from "react-router-dom";
import SignForm from "./SignForm";

const Register = ({onSubmit}) => {
  return (
    <SignForm 
      title="Регистрация"
      buttonText="Зарегистрироваться"
      name="register"
      onSubmit={onSubmit}
    >
      <Link 
        to="/signin"
        className="link sign-form__link"  
      >Уже зарегистрированы? Войти</Link>
    </SignForm>
  )
}

export default Register;
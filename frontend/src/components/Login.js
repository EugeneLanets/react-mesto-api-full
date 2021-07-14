import SignForm from "./SignForm";

const Login = ({onSubmit}) => {
  return (
    <SignForm 
      title="Вход"
      buttonText="Войти"
      name="login"
      onSubmit={onSubmit}
    />
  );
}

export default Login;
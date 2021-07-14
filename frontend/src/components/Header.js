import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import HeaderLink from "./HeaderLink";
import UserMenu from "./UserMenu";

const Header = ({loggedIn, email, onLogout}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    setMenuOpen(false);
  }, [loggedIn])
  return (
    <header className={`header ${menuOpen ? 'header_menu-open' : ''}`}>
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      {loggedIn ? <UserMenu email={email} onLogout={onLogout} onOpen={handleMenuOpen} isOpen={menuOpen}/> : <HeaderLink />}
    </header>
  );
}

export default Header;
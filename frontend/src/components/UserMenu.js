const UserMenu = ({email, isOpen, onLogout, onOpen}) => {
  return (
    <div className="user-menu">
      <div className={`user-menu__items ${isOpen ? 'user-menu__items_shown' : ''}`}>
        <p className="user-menu__email">{email}</p>
        <button 
          type="button" 
          className="user-menu__button user-menu__button_type_logout"
          onClick={onLogout}
        >
          Выйти
        </button>
        </div>
      <button 
        type="button"
        className={`user-menu__button user-menu__button_type_show ${isOpen ? 'user-menu__button_shown' : ''}`}
        onClick={onOpen}
        aria-label="Открыть меню"
      >
      </button>
    </div>
  );
}

export default UserMenu;
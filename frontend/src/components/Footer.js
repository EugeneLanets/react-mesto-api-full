const Footer = () => {
  const startYear = 2020;
  const thisYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {startYear}{thisYear !== startYear ? `-${thisYear}` : ''} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
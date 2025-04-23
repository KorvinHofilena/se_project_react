import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer__container">
      <p className="footer__text">Developed by Korvin Hofilena</p>
      <p className="footer__text">{2024}</p>
    </footer>
  );
}

export default Footer;

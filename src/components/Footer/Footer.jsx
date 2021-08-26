import React from 'react';
import './Footer.css'

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__wrap">
          <p className="footer__copyright">© 2021</p>
          <nav className="footer__nav">
            <ul className="footer__links-list">
              <li className="footer__links-item">
                <a
                  className="footer__link"
                  href="https://praktikum.yandex.ru/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__links-item">
                <a
                  className="footer__link"
                  href="https://github.com/tyumen-777"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className="footer__links-item">
                <a
                  className="footer__link"
                  href="https://www.linkedin.com/in/artemii-pudovkin-6a9368205/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
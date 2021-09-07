import React from "react";
import { useLocation } from "react-router";
import "./Footer.css";

function Footer() {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/signin" && pathname !== "/signup" ? (
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
                      href="https://github.com/Droni90"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}

export default Footer;

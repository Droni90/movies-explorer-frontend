import React from 'react';
import './Techs.css'

function Techs() {
  return (
    <section>
      <div className="techs">
        <div className="techs__container">
          <h2 className="techs__section-title">Технологии</h2>
          <h3 className="techs__title">7 технологий</h3>
          <p className="techs__subtitle">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/HTML"
                target="_blank"
                rel="noreferrer"
              >
                HTML
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/CSS"
                target="_blank"
                rel="noreferrer"
              >
                CSS
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/JavaScript"
                target="_blank"
                rel="noreferrer"
              >
                JS
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/React"
                target="_blank"
                rel="noreferrer"
              >
                React
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/Git"
                target="_blank"
                rel="noreferrer"
              >
                Git
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/Express.js"
                target="_blank"
                rel="noreferrer"
              >
                Express.js
              </a>
            </li>
            <li className="techs__list-item">
              <a
                className="techs__list-link"
                href="https://ru.wikipedia.org/wiki/MongoDB"
                target="_blank"
                rel="noreferrer"
              >
                mongoDB
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
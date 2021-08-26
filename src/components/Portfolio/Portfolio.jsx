import React from 'react';
import './Portfolio.css'

function Portfolio(props) {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <a
            className="portfolio__link"
            href="https://github.com/tyumen-777/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__name">Статичный сайт</p>
            <svg
              className="portfolio__icon"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                fill="black"
              />
            </svg>
          </a>
        </li>
        <li className="portfolio__project">
          <a
            className="portfolio__link"
            href="https://github.com/tyumen-777/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__name">Адаптивный сайт</p>
            <svg
              className="portfolio__icon"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                fill="black"
              />
            </svg>
          </a>
        </li>
        <li className="portfolio__project">
          <a
            className="portfolio__link"
            href="https://github.com/tyumen-777/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__name">Одностраничное приложение</p>
            <svg
              className="portfolio__icon"
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.60653 16.5241L14.9645 4.14489L14.9432 13.6903H17.2656V0.181818H3.77841L3.7571 2.48295H13.3026L0.944603 14.8622L2.60653 16.5241Z"
                fill="black"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
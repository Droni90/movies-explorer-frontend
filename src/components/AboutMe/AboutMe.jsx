import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__wrap">
          <div className="about-me__description">
            <div className="about-me__description">
              <h3 className="about-me__name">Андрей</h3>
              <p className="about-me__profession">
                Фронтенд-разработчик, 26 лет
              </p>
              <p className="about-me__text">
                Огромное желание расти в профессиональной области, постоянно
                развиваюсь и хочу перенимать лучший опыт в веб-разработке.
                Пунктуально и ответственно отношусь к дедлайнам.
              </p>
            </div>
            <div className="about-me__links">
              <a
                className="about-me__link"
                href="https://github.com/Droni90"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <img className="about-me__photo" src={photo} alt="Фото студента" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;

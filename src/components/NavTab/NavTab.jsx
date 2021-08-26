import React from 'react';
import './NavTab.css';

function NavTab(props) {
  return (
    <section className='navtab'>
      <a className='navtab__link' href='#about'>
        <button className='navtab__btn'>О проекте</button>
      </a>
      <a className='navtab__link' href=''>
        <button className='navtab__btn'>Технологии</button>
      </a>
      <a className='navtab__link' href=''>
        <button className='navtab__btn'>Студент</button>
      </a>
    </section>
  );
}

export default NavTab;
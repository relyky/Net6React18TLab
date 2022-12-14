import React from 'react';
import logo from './logo.svg';
import ss from './Home.module.css';

export default function Home() {
  return (
    <div className={ss.app}>
      <header className={ss.app_header}>
        <img src={logo} className={ss.app_logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={ss.app_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

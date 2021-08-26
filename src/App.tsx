import logo from './logo.svg';
import * as React from 'react'
import './App.css';
import { Header } from './components/Header'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="120" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#"
        >
          source-base-react
        </a>
      </header>
      <Header
        name={'this prop is from App.tsx'}
      />
    </div>
  );
}

export default App;

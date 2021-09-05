import './App.css';
import logo from './logo.svg';
import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import { Header } from './components/Header'

function App() {
  React.useEffect(() => {
    console.log('useEffect still works')

  }, [])
  return (
    <div className="App">
      <header className="App-header" style={{ padding: 50 }}>
        <img src={logo} className="App-logo" alt="logo" width="120" />
        <p>
          ok setting up for report Front-End
        </p>
        <a
          className="App-link"
          href="#"
        >
          source-base-react
        </a>
      </header>
      <Header
        name={'this prop is from App..tsx'}
      />
    </div>
  );
}

export default hot(App);

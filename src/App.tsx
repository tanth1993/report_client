import './App.scss';
import { hot } from 'react-hot-loader/root';
import * as React from 'react'
import { RoutesModule } from './routes'

function App() {
  return (
    <div className="App">
      <RoutesModule />
    </div>
  );
}

export default hot(App);

import './App.scss';
import * as React from 'react'
import { RoutesModule } from './routes'
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <RoutesModule />
      </div>
    </StyledEngineProvider>
  );
}

export default App;

import { MemoryRouter } from 'react-router-dom';
import Navigation from './pages/Navigation';

function App() {
  return (
    <>
      <MemoryRouter>
          <Navigation />
      </MemoryRouter>
    </>
  );
}

export default App;

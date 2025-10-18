import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/appRouter';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;

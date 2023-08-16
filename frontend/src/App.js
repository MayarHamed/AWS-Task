import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from "./pages/Homepage";
import Header from "./components/Header";
import Login from './pages/Login';

function App() {
  return (
    <div className="app bg-dark text-light">
      <Header />
      <Routes>
        <Route path='/dashboard' Component={Home} />
        <Route exact path='/' Component={Login} />
      </Routes>
    </div>
  );
}

export default App;

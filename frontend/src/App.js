import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from "./pages/Homepage";
import Header from "./components/Header";

function App() {
  return (
    <div className="app bg-dark text-light">
      <Header />
      <Routes>
        <Route exact path='/' Component={Home} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import routes from './data/routes.js';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <NavLink to={routes.home}>Home</NavLink>
          </li>
          <li>
            <NavLink to={routes.about}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={routes.contact}>Contact Us</NavLink>
          </li>
        </ul>
        <Routes>
          <Route exact path={routes.home} element={<Home />}></Route>
          <Route exact path={routes.about} element={<About />}></Route>
          <Route exact path={routes.contact} element={<Contact />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;

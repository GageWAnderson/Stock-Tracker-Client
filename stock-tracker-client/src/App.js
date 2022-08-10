import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import BreadcrumbBar from './components/BreadcrumbBar';
import PageRoutes from './components/PageRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar />
        <BreadcrumbBar />
        <PageRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App;

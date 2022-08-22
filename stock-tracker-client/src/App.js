import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import BreadcrumbBar from './components/BreadcrumbBar';
import PageRoutes from './components/PageRoutes';
import { readPortfolio } from './util/requests';
import { useDispatch, useSelector } from 'react-redux';
import { updatePortfolio } from './redux/portfolioSlice';

const App = () => {

  const uuid = useSelector(state => state.profile.uuid);
  const dispatch = useDispatch();

  useEffect(() => {
    readPortfolio(uuid)
      .then((response) => {
        dispatch(updatePortfolio(response));
      })
      .catch((err) => {
        console.error(err);
      })
  }, [dispatch, uuid])

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

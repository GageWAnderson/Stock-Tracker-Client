import React from "react";
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom';
import routes from "../data/routes.js";
import { Container } from "reactstrap";
import StockTracker from "../pages/StockTracker/StockTracker";
import Portfolio from '../pages/Portfolio/Portfolio';
import Profile from '../pages/Profile/Profile';

const PageRoutes = () => {
    return (
        <Container>
            <Routes>
                <Route exact path={routes.home} element={<Home />}></Route>
                <Route exact path={routes.profile} element={<Profile />}></Route>
                <Route exact path={routes.stockTracker} element={<StockTracker />}></Route>
                <Route exact path={routes.myPortfolio} element={<Portfolio />}></Route>
            </Routes>
        </Container>
    );
};

export default PageRoutes;
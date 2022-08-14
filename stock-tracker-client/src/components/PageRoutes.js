import React from "react";
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import CreateOrUpdateObject from '../pages/CreateOrUpdateObject';
import CurrentObjects from '../pages/CurrentObjects';
import DeleteObject from '../pages/DeleteObject';
import { Route, Routes } from 'react-router-dom';
import routes from "../data/routes.js";
import { Container } from "reactstrap";
import StockTracker from "../pages/StockTracker/StockTracker";

const PageRoutes = () => {
    return (
        <Container>
            <Routes>
                <Route exact path={routes.home} element={<Home />}></Route>
                <Route exact path={routes.about} element={<About />}></Route>
                <Route exact path={routes.contact} element={<Contact />}></Route>
                <Route exact path={routes.currentObjects} element={<CurrentObjects />}></Route>
                <Route exact path={routes.postObject} element={<CreateOrUpdateObject />}></Route>
                <Route exact path={routes.deleteObject} element={<DeleteObject />}></Route>
                <Route exact path={routes.stockTracker} element={<StockTracker />}></Route>
            </Routes>
        </Container>
    );
};

export default PageRoutes;
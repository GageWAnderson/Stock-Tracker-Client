import React, { useEffect } from "react";
import { NavLink as RRNavLink, useLocation } from "react-router-dom";
import routes from '../data/routes';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { replaceBreadcrumbs } from "../redux/breadcrumbSlice";
import breadcrumbTextMap from "../data/breadcrumbTextMap";

const NavigationBar = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(replaceBreadcrumbs([breadcrumbTextMap[location.pathname]]));
    }, [location, dispatch])

    return (
        <Navbar color='dark' dark>
            <NavbarBrand>Stock Tracker</NavbarBrand>
            <Nav className="me-auto">
                <NavItem>
                    <NavLink to={routes.home} tag={RRNavLink}>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={routes.profile} tag={RRNavLink}>Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={routes.stockTracker} tag={RRNavLink}>Stock Tracker</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to={routes.myPortfolio} tag={RRNavLink}>My Portfolio</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;
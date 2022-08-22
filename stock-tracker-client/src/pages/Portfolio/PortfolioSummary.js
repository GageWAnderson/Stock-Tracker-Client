import React from "react";
import { Container } from "reactstrap";

const PortfolioSummary = ({ portfolio }) => {

    const getTotalValue = () => {
        return portfolio.portfolio.reduce((total, currStock) => {
            return total + currStock.sharePriceUSD + currStock.shareNumber;
        }, 0)
    }
    return (
        <Container>
            <h1>My Portfolio:</h1>
            <h2>Total Value = ${getTotalValue()}</h2>
        </Container>
    );
}

export default PortfolioSummary;
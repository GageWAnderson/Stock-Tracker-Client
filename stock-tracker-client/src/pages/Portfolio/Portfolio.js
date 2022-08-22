import React from "react";
import PortfolioSummary from "./PortfolioSummary";
import StockAllocationList from "./StockAllocationList";
import PortfolioGraph from "./PortfolioGraph";
import { useSelector } from "react-redux";
import { Container, Alert } from "reactstrap";
import StockAllocationInputForm from "./StockAllocationInputForm";

const Portfolio = () => {

    const portfolio = useSelector((state) => state.portfolio.portfolio);

    const renderContent = () => {
        if (!portfolio) {
            return (
                <Alert color="info">
                    Please enter portfolio information.
                </Alert>
            );
        } else {
            return (
                <>
                    <PortfolioSummary portfolio={portfolio} />
                    <PortfolioGraph portfolio={portfolio} />
                    <StockAllocationList portfolio={portfolio} />
                </>
            );
        }
    }

    return (
        <Container>
            {renderContent()}
            <StockAllocationInputForm />
        </Container>
    );
};

export default Portfolio;
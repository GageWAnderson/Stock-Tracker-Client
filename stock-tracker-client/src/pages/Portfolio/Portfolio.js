import React, { useState } from "react";
import PortfolioSummary from "./PortfolioSummary";
import StockAllocationList from "./StockAllocationList";
import PortfolioGraph from "./PortfolioGraph";
import { useSelector } from "react-redux";
import { Container, Alert, Button } from "reactstrap";
import StockAllocationInputForm from "./StockAllocationInputForm";
import './Portfolio.css';

const Portfolio = () => {

    const portfolio = useSelector((state) => state.portfolio.portfolio);
    const [addingFirstStock, setAddingFirstStock] = useState(false);

    const createPortfolio = (event) => {
        event.preventDefault();
        setAddingFirstStock(prevState => !prevState);
    }

    const renderContent = () => {
        if (!portfolio) {
            return (
                <Alert color="info">
                    <span>
                        You don't have a portfolio yet! Please Create a portfolio.
                        <Button className="add-portfolio-right-align" color="primary" onClick={createPortfolio}>{!addingFirstStock ? "Create Portfolio" : "Never Mind"}</Button>
                    </span>
                    <br />

                    {addingFirstStock ? <>
                        <h3 className="add-first-stock">Add a Stock to get started.</h3>
                        <StockAllocationInputForm />
                    </> : null}
                </Alert>
            );
        } else {
            return (
                <>
                    <PortfolioSummary portfolio={portfolio} />
                    <PortfolioGraph portfolio={portfolio} />
                    <StockAllocationList portfolio={portfolio} />
                    <StockAllocationInputForm />
                </>
            );
        }
    }

    return (
        <Container>
            {renderContent()}
        </Container>
    );
};

export default Portfolio;
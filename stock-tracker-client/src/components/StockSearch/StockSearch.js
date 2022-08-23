import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input, Spinner, FormFeedback } from "reactstrap";
import { getStockSymbolSearchResultsRequest } from "../../util/requests";
import saveStatus from "../../util/saveStatus";
import StockSearchResults from "./StockSearchResults";
import "./StockSearch.css";

const StockSearch = ({ stockSymbol, setStockSymbol, hasError }) => {

    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputState, setInputState] = useState(saveStatus.UNSAVED);

    useEffect(() => {
        setStockSymbol(stockSymbol);
    }, [stockSymbol, setStockSymbol]);

    const changeStockSymbol = (event) => {
        event.preventDefault();
        setStockSymbol(event.target.value);
    }

    const runSearch = (event) => {
        event.preventDefault();
        if (stockSymbol.length === 0) {
            setInputState(saveStatus.FAILURE);
            return;
        }
        setIsLoading(true);
        getStockSymbolSearchResultsRequest(stockSymbol)
            .then((response) => {
                if (response.resultsFound) {
                    setSearchResults(response.searchResult);
                } else {
                    setSearchResults([]);
                }
                setInputState(saveStatus.SUCCESS);
            })
            .catch((err) => {
                setInputState(saveStatus.FAILURE);
                setSearchResults([]);
            })
        setIsLoading(false);
        setHasSearched(true);
    }

    const getStockInputComponent = () => {
        if (inputState === saveStatus.UNSAVED) {
            return <Input onChange={changeStockSymbol} value={stockSymbol} />;
        } else if (inputState === saveStatus.FAILURE || hasError) {
            return (
                <>
                    <Input invalid onChange={changeStockSymbol} value={stockSymbol} />
                    <FormFeedback>Please enter a valid stock.</FormFeedback>
                </>
            );
        } else {
            return <Input valid onChange={changeStockSymbol} value={stockSymbol} />;
        }
    }

    if (isLoading) {
        console.log('loading...');
        return (
            <Spinner>
                Loading Search Results...
            </Spinner>
        );
    } else {
        return (
            <FormGroup>
                <Label>Input stock ticker symbol</Label>
                {getStockInputComponent()}
                {hasSearched ? <StockSearchResults setStockSymbol={setStockSymbol} searchResults={searchResults} /> : null}
                <Input className="stock-search-button" type="button" value="Search" onClick={runSearch} />
            </FormGroup>
        );
    }

}

export default StockSearch;
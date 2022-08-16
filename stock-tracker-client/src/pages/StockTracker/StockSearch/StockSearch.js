import React, { useState } from "react";
import { FormGroup, Label, Input, FormText } from "reactstrap";
import { getStockSymbolSearchResultsRequest } from "../../../util/requests";
import StockSearchResults from "./StockSearchResults";

const StockSearch = ({ setStockSymbol }) => {

    const [searchResults, setSearchResults] = useState([]);

    const changeStockSymbolAndRunSearch = (event) => {
        event.preventDefault();
        setStockSymbol(event.target.value);
        getStockSymbolSearchResultsRequest(event.target.value)
            .then((response) => {
                console.log(response);
                if (response.resultsFound) {
                    setSearchResults(response.searchResult);
                } else {
                    setSearchResults([]);
                }
            })
            .catch((err) => {
                console.error(err);
                setSearchResults([]);
            })
    }

    return (
        <FormGroup>
            <Label>Input stock ticker symbol</Label>
            <Input onChange={changeStockSymbolAndRunSearch} />
            <FormText>
                Must be a valid (all-caps) ticker symbol on the NYSE.
            </FormText>
            <StockSearchResults searchResults={searchResults} />
        </FormGroup>
    );
}

export default StockSearch;
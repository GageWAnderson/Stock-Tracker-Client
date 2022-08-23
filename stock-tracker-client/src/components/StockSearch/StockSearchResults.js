import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const StockSearchResults = ({ setStockSymbol, searchResults }) => {

    const [activeIndex, setActiveIndex] = useState(null);

    const setStyleAndStockSymbol = (event) => {
        event.preventDefault();
        const stockText = event.target.textContent;
        searchResults.forEach((searchResult, idx) => {
            if (searchResult.symbol === stockText) {
                setActiveIndex(idx);
                setStockSymbol(stockText);
            }
        });
    }

    const formatStockSearchResult = (result) => {
        return result.symbol;
    };

    return (
        <ListGroup className="stock-result-list">
            {searchResults.map((result, idx) => {
                return (
                    <ListGroupItem className={idx === activeIndex ? "active" : ""} onClick={setStyleAndStockSymbol} key={idx}>
                        {formatStockSearchResult(result)}
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
}

export default StockSearchResults;
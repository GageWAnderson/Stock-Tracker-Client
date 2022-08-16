import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const StockSearchResults = ({ searchResults }) => {

    const formatStockSearchResult = (result) => {
        return result.symbol;
    };

    return (
        <ListGroup>
            {searchResults.map((result) => {
                return(
                    <ListGroupItem>
                        {formatStockSearchResult(result)}
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
}

export default StockSearchResults;
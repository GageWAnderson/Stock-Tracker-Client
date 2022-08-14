import React from "react";
import './DisplayedStocksList.css';
import { ListGroup } from "reactstrap";
import StockListItem from "./StockListItem";

const DisplayedStocksList = ({ stockList, setStockList }) => {

    return (
        <ListGroup>
            {stockList.map((stock, idx) => {
                return (
                    <StockListItem key={idx} stock={stock} stockList={stockList} setStockList={setStockList} />
                );
            })}
        </ListGroup>
    );
}

export default DisplayedStocksList;
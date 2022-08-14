import React from "react";
import { ListGroupItem, Button } from "reactstrap";

const StockListItem = ({ stock, stockList, setStockList }) => {

    const removeStock = (event) => {
        event.preventDefault();
        setStockList(stockList.filter(thisStock => thisStock !== stock));
    }

    return (
        <ListGroupItem>
            <span>
                {stock}
                <Button className="stock-list-right-align" size="sm" color="danger" onClick={removeStock}>
                    remove
                </Button>
            </span>
        </ListGroupItem>
    );
}

export default StockListItem;
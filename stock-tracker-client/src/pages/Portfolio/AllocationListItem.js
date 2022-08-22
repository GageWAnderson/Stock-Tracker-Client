import React from "react";
import { useSelector } from "react-redux";
import { ListGroupItem, Button } from "reactstrap";
import { postPortfolio } from "../../util/requests";
import saveStatus from "../../util/saveStatus";

const StockListItem = ({ stockData, index, setRemoveStatus }) => {

    const uuid = useSelector(state => state.profile.uuid);

    const removeStock = (event) => {
        event.preventDefault();
        setRemoveStatus(saveStatus.LOADING);
        postPortfolio(uuid, stockData.stockSymbol, -stockData.shareNumber)
            .then((response) => {
                setRemoveStatus(saveStatus.SUCCESS);
            })
            .catch(() => {
                setRemoveStatus(saveStatus.FAILURE);
            })
    }

    const calculateTotalValue = (sharePrice, shareNumber) => {
        return sharePrice * shareNumber;
    }

    return (

        <ListGroupItem key={index}>
            <span>
                <b>Stock Ticker: </b>
                {stockData.stockSymbol}
                <b>Number of Shares:</b>
                {stockData.shareNumber}
                <b>Total Value:</b>
                {calculateTotalValue(stockData.sharePriceUSD, stockData.shareNumber)}
                <Button className="stock-list-right-align" size="sm" color="danger" onClick={removeStock}>
                    remove
                </Button>
            </span>
        </ListGroupItem>
    );
}

export default StockListItem;








import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import StockSearch from "../../components/StockSearch/StockSearch";
import { updatePortfolio } from '../../redux/portfolioSlice';
import { postPortfolio } from "../../util/requests";

const modes = {
    BUY: 'BUY',
    SELL: 'SELL'
}

const StockAllocationInputForm = () => {

    const dispatch = useDispatch();

    const uuid = useSelector(state => state.profile.uuid);
    const portfolio = useSelector(state => state.portfolio.portfolio);

    const [inputStock, setInputStock] = useState("");
    const [numShares, setNumShares] = useState(0);
    const [numSharesInputError, setNumSharesInputError] = useState(false);
    const [stockInputError, setStockInputError] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mode, setMode] = useState(modes.BUY);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const changeNumShares = (event) => {
        event.preventDefault();
        const parsed = parseInt(event.target.value);
        if (isNaN(parsed)) {
            setNumSharesInputError(true);
        } else {
            setNumSharesInputError(false);
        }
        setNumShares(event.target.value);
    }

    const renderInputShares = () => {
        const buyOrSellText = mode === modes.BUY ? "Buy" : "Sell";
        if (numSharesInputError) {
            return (
                <>
                    <Label>Number of Shares to {buyOrSellText}</Label>
                    <Input invalid value={numShares} onChange={changeNumShares} />
                    <FormFeedback>Please Enter a Valid Number of Shares</FormFeedback>
                </>
            );
        } else {
            return (
                <>
                    <Label>Number of Shares to {buyOrSellText}</Label>
                    <Input value={numShares} onChange={changeNumShares} />
                </>
            );
        }
    }

    const submitStockToPortfolio = (event) => {
        event.preventDefault();
        if (!numSharesInputError) {
            postPortfolio(uuid, inputStock, (mode === modes.BUY ? numShares : -numShares))
                .then((response) => {
                    dispatch(updatePortfolio(response));
                    setStockInputError(false);
                    setNumSharesInputError(false);
                })
                .catch((err) => {
                    setStockInputError(true);
                    setNumSharesInputError(true);
                })
        }
    }

    const handleBuyClick = (event) => {
        event.preventDefault();
        setMode(modes.BUY);
    }

    const handleSellClick = (event) => {
        event.preventDefault();
        setMode(modes.SELL);
    }

    const renderBuyOrSellDropdown = () => {
        return (
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                <DropdownToggle caret>Buy or Sell</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={handleBuyClick}>Buy</DropdownItem>
                    <DropdownItem onClick={handleSellClick}>Sell</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    return (
        <Form onSubmit={submitStockToPortfolio}>
            <StockSearch stockSymbol={inputStock} setStockSymbol={setInputStock} hasError={stockInputError} />
            {renderBuyOrSellDropdown()}
            <FormGroup>
                {renderInputShares()}
                <FormText>Must be an integer value greater than 0.</FormText>
            </FormGroup>
            <Input type="submit" value="Submit Stock Allocation to Portfolio" />
        </Form>
    );
}

export default StockAllocationInputForm;
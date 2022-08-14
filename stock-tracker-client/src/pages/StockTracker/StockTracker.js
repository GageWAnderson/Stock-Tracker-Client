import React, { useState } from "react";
import saveStatus from '../../util/saveStatus';
import timePeriods from '../../data/timePeriods';
import { getDailyStockDataRequest, getIntradayStockDataRequest } from '../../util/requests';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
import { Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import DisplayedStocksList from "./DisplayedStocksList";
Chart.register(...registerables);

const StockTracker = () => {

    const options = {
        responsive: true,
        scales: {
            x: {
                title: 'time'
            },
            y: {
                title: 'USD per share'
            }
        },
        plugins: {
            legend: {
                position: 'left',
            },
            title: {
                display: true,
                text: `Stock Prices`
            }
        }
    }

    const [stockData, setStockData] = useState({});
    const [interval, setInterval] = useState(1);
    const [compact, setCompact] = useState(true);
    const [timePeriod, setTimePeriod] = useState(timePeriods.DAILY);
    const [stockSymbol, setStockSymbol] = useState(null);
    const [pageStatus, setPageStatus] = useState(saveStatus.UNSAVED);
    const [displayedStocks, setDisplayedStocks] = useState([]);

    const changeStockSymbol = (event) => {
        event.preventDefault();
        setStockSymbol(event.target.value);
    }

    const changeInterval = (event) => {
        event.preventDefault();
        setInterval(parseInt(event.target.value.replace("minutes", "").trim()));
    }

    const changeCompact = (event) => {
        event.preventDefault();
        if (event.target.value === "Compact") {
            setCompact(true);
        } else {
            setCompact(false);
        }
    }

    const changeTimePeriod = (event) => {
        event.preventDefault();
        setTimePeriod(event.target.value);
    }

    const submitIntradayStockQuery = (event) => {
        event.preventDefault();
        setPageStatus(saveStatus.LOADING);
        getIntradayStockDataRequest(stockSymbol, interval)
            .then((data) => {
                parseStockQueryData(data);
                setPageStatus(saveStatus.SUCCESS);
            })
            .catch(() => {
                setPageStatus(saveStatus.FAILURE);
            })
    }

    const submitDailyStockQuery = (event) => {
        event.preventDefault();
        setPageStatus(saveStatus.LOADING);
        getDailyStockDataRequest(stockSymbol, compact)
            .then((data) => {
                parseStockQueryData(data);
                setPageStatus(saveStatus.SUCCESS);
            })
            .catch(() => {
                setPageStatus(saveStatus.FAILURE);
            })
    }

    const submitStockQuery = (event) => {
        event.preventDefault();
        setDisplayedStocks(prevDisplayedStocks => prevDisplayedStocks.concat(stockSymbol));
        if (timePeriod === timePeriods.DAILY) {
            submitDailyStockQuery(event)
        } else {
            submitIntradayStockQuery(event);
        }
    }

    const parseStockQueryData = (rawApiData) => {
        const chartData = {
            labels: rawApiData.metaData.times,
            datasets: [{
                label: `Stock price of ${stockSymbol}`,
                data: rawApiData.timeSeries.map((stockPriceData) => {
                    return stockPriceData.close;
                }),
                borderColor: 'rgb(0,255,0)'
            }]
        }
        setStockData(chartData);
    }

    const renderCompactSelect = () => {
        return (
            <FormGroup>
                <Label for="compactSelect">
                    Select if the data retrieved should be full or compact.
                </Label>
                <Input
                    id="compactSelect"
                    type="select"
                    onChange={changeCompact}
                >
                    <option>
                        Compact
                    </option>
                    <option>
                        Full
                    </option>
                </Input>
            </FormGroup>
        );
    }

    const renderIntervalSelect = () => {
        return (
            <FormGroup>
                <Label for="intervalSelect">
                    Select a data collection interval.
                </Label>
                <Input
                    id="intervalSelect"
                    type="select"
                    onChange={changeInterval}
                >
                    <option>
                        1 minute
                    </option>
                    <option>
                        5 minutes
                    </option>
                    <option>
                        15 minutes
                    </option>
                    <option>
                        30 minutes
                    </option>
                    <option>
                        60 minutes
                    </option>
                </Input>
            </FormGroup>
        );
    }

    const stockInfoInputForm = () => {
        return (
            <Form onSubmit={submitStockQuery}>
                <FormGroup>
                    <Label>Input stock ticker symbol</Label>
                    <Input onChange={changeStockSymbol} />
                    <FormText>
                        Must be a valid (all-caps) ticker symbol on the NYSE.
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="timePeriodSelect">
                        Select a timescale for stock data.
                    </Label>
                    <Input
                        id="timePeriodSelect"
                        type="select"
                        onChange={changeTimePeriod}>
                        <option>
                            {timePeriods.INTRADAY}
                        </option>
                        <option>
                            {timePeriods.DAILY}
                        </option>
                    </Input>
                </FormGroup>
                {timePeriod === timePeriods.DAILY ? renderCompactSelect() : renderIntervalSelect()}
                <Input type="submit" value="Submit Stock Query" />
            </Form>
        );
    }


    const renderContent = () => {
        if (pageStatus === saveStatus.LOADING) {
            return (
                <h2>Stock Data Loading...</h2>
            );
        } else if (pageStatus === saveStatus.FAILURE) {
            return (
                <h2>There was an error retrieving stock data.</h2>
            );
        } else {
            return (
                <>
                    {pageStatus === saveStatus.SUCCESS ?
                        <Line options={options} data={stockData} />
                        : null}
                    <DisplayedStocksList stockList={displayedStocks} setStockList={setDisplayedStocks} />
                    {stockInfoInputForm()}
                </>

            );
        }
    }

    return (
        <>
            <h1>StockTracker</h1>
            {renderContent()}

        </>
    );
}

export default StockTracker;
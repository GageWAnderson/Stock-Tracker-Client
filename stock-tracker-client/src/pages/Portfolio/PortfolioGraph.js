import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Alert, Spinner } from "reactstrap";
import { getPortfolioValueTimeSeries } from "../../util/requests";
import saveStatus from "../../util/saveStatus";
import { useSelector } from 'react-redux';

const PortfolioGraph = ({ portfolio }) => {

    const uuid = useSelector(state => state.profile.uuid);
    const [graphLoadState, setGraphLoadState] = useState(saveStatus.LOADING);
    const [chartData, setChartData] = useState({});
    console.log(chartData);

    useEffect(() => {
        console.log('re-rendering portfolio graph.')
        getPortfolioValueTimeSeries(uuid)
            .then((response) => {
                setChartData(formatChartData(response));
                setGraphLoadState(saveStatus.SUCCESS);
            })
            .catch(() => {
                setGraphLoadState(saveStatus.FAILURE);
            })
    }, [uuid, portfolio])

    const formatChartData = (stockData) => {
        console.log(stockData);
        return (
            {
                labels: stockData.timestamps,
                datasets: [{
                    label: 'Total Portfolio Value in USD',
                    data: stockData.portfolioValues,
                    borderColor: "rgb(0,0,0)"
                }]
            }
        );
    }

    if (graphLoadState === saveStatus.LOADING) {
        return <Spinner>Portfolio Graph Loading...</Spinner>
    } else if (graphLoadState === saveStatus.FAILURE) {
        return <Alert color="danger">Failed to Load Portfolio Graph</Alert>
    } else if (chartData.labels.length === 0 || chartData.datasets[0].data.length === 0) {
        return <Alert color="info">No Portfolio Data to Display</Alert>
    } else {
        return <Line data={chartData} />
    }
}

export default PortfolioGraph;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, ListGroup, Spinner } from "reactstrap";
import saveStatus from "../../util/saveStatus";
import AllocationListItem from './AllocationListItem';
import { readPortfolio } from "../../util/requests";
import { updatePortfolio } from "../../redux/portfolioSlice";

const StockAllocationList = ({ portfolio }) => {

    const [removeStatus, setRemoveStatus] = useState(saveStatus.UNSAVED);
    const dispatch = useDispatch();
    const uuid = useSelector(state => state.profile.uuid);

    const allocation = (stockData, index) => {
        return (
            <AllocationListItem setRemoveStatus={setRemoveStatus} stockData={stockData} index={index} />
        );
    }

    useEffect(() => {
        if (removeStatus === saveStatus.SUCCESS) {
            readPortfolio(uuid)
                .then((response) => {
                    dispatch(updatePortfolio(response));
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [dispatch, uuid, removeStatus])

    const renderRemovalMessage = () => {
        if (removeStatus === saveStatus.SUCCESS) {
            return <Alert color="success">Successfully removed stock from portfolio.</Alert>;
        } else if (removeStatus === saveStatus.FAILURE) {
            return <Alert color="danger">Failed to remove stock from portfolio.</Alert>;
        } else if (removeStatus === saveStatus.LOADING) {
            return <Spinner>Removing Stock...</Spinner>;
        } else {
            return null;
        }
    }

    return (
        <>
            {renderRemovalMessage()}
            <ListGroup >
                {
                    portfolio.portfolio.map((stockData, idx) => {
                        return (allocation(stockData, idx));
                    })
                }
            </ListGroup >
        </>

    );
}

export default StockAllocationList;
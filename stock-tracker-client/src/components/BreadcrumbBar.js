import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { useSelector } from 'react-redux';

const BreadcrumbBar = () => {

    const breadcrumbs = useSelector((state) => state.breadcrumb.breadcrumbs);

    const item = (text) => {
        return (
            <BreadcrumbItem active>
                {text}
            </BreadcrumbItem>
        );
    }

    return (
        <Breadcrumb>
            {breadcrumbs.map((breadcrumb) => item(breadcrumb))}
        </Breadcrumb>
    );
};

export default BreadcrumbBar;
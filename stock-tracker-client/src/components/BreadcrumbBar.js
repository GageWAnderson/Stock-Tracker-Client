import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { useSelector } from 'react-redux';

const BreadcrumbBar = () => {

    const breadcrumbs = useSelector((state) => state.breadcrumb.breadcrumbs);

    const item = (text, idx) => {
        return (
            <BreadcrumbItem key={idx} active>
                {text}
            </BreadcrumbItem>
        );
    }

    return (
        <Breadcrumb>
            {breadcrumbs.map((breadcrumb, idx) => item(breadcrumb, idx))}
        </Breadcrumb>
    );
};

export default BreadcrumbBar;
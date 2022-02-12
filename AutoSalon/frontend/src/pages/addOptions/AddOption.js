import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
// import { Breadcrumb } from "react-bootstrap"; // maybe add later
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddOptionDelete from "../../components/addOption/addOption-delete";
import AddOptionDetail from "../../components/addOption/addOption-detail";
import AddOptionUpdate from "../../components/addOption/addOption-patch";
import { fetchAddOption, addOptionSelector } from "../../slices/addOptionSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const AddOption = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { isAuthenticated, is_superuser, is_sales_director, is_sales_manager } = useSelector(userSelector);
    const addOption = useSelector(addOptionSelector);

    useEffect(() =>{
        const id = params.id;
        dispatch(fetchAddOption(id));
    }, [dispatch]);

    const renderAddOption = () => {
        if (addOption) {
            return <AddOptionDetail addOption={addOption}/>
        } else {
            return <p>Ожидание загрузки страницы...</p>
        }
    };

    const renderUpdateForm = () => {
        if (addOption) {
            return <AddOptionUpdate addOption={addOption}/>
        } else {
            return <p>Ожидание загрузки формы обновления...</p>
        }
    };

    const renderDeleteFeature = () => {
        if (addOption) {
            return <AddOptionDelete addOption={addOption}/>
        } else {
            return <p>Ожидание загрузки функции удаления...</p>
        }
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
                { isAuthenticated && (is_superuser || is_sales_director || is_sales_manager) ? (
                    <Fragment>
                        <Col xs lg="6">
                            {renderAddOption()}
                        </Col> 
                        <Col xs lg="4">
                            {renderUpdateForm()}
                        </Col>
                        <div className="mt-5"> 
                            {renderDeleteFeature()}
                        </div>
                    </Fragment>
                    ):(
                        <Fragment>
                            <Col xs lg="6">
                                {renderAddOption()}
                            </Col>
                        </Fragment>
                    )   
                }
            </Row>
        </section>
    );
};

export default AddOption;
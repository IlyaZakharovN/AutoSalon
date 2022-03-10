import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { CreateAddOption } from "../../components/addOption/addOption-create";
import { AddOptionList } from "../../components/addOption/addOption-list";
import { retriveAddOptions } from "../../slices/addOptionSlice";
import { userSelector, retriveUserData } from "../../slices/userSlice";

const AddOptions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isAuthenticated, user } = useSelector(userSelector);
    const addOptions = useSelector(state => state.addOption)

    const initFetch = useCallback(async() => {
        await dispatch(retriveAddOptions());
    }, [dispatch]); 

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const renderAddOptionList = () => {
        if (addOptions) {
            return <AddOptionList addOptions={addOptions}/>;
        } else 
        {
            return <p>Ожидание загрузки списка доп. оборудования...</p>
        }
    };

    const renderCreateAddOption = () => {
        return <CreateAddOption/>
    };

    return (
        <section>
            <Row className="mt-3 justify-content-md-center">
            { isAuthenticated && (user.user.is_superuser || user.user.is_sales_director || user.user.is_sales_manager) ? (
               <Fragment>
                    <Col xs lg="6">
                        {renderAddOptionList()}
                    </Col> 
                    <Col xs lg="4">
                        {renderCreateAddOption()}
                    </Col>
                </Fragment> 
            ):(
                <Fragment>
                    {renderAddOptionList()}
                </Fragment>
            )}
            </Row>
        </section>
    );
};

export default AddOptions;
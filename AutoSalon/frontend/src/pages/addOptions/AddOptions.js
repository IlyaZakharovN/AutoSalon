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
    const { isAuthenticated, is_superuser, is_sales_director, is_sales_manager } = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addOptions = useSelector(state => state.addOption)

    const fetchAddOptions = useCallback(async() => { 
        console.log('fetching add options...');
        await dispatch(retriveAddOptions());
        // setCars(result.payload);
        // console.log(addOptions);
    }, [dispatch]);

    useEffect(() => {
        return fetchAddOptions();
    }, [fetchAddOptions]);

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
            { isAuthenticated && (is_superuser || is_sales_director || is_sales_manager) ? (
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

                </Fragment>
            )}
            </Row>
        </section>
    );
};

export default AddOptions;
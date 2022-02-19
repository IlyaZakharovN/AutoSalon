import React, { Fragment, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createTestDrive, getAllTestDrives } from "../../../slices/testDriveSlice";

export const CreateTestDriveEmpl = ({cars, carModels, testDriveStatuses, user}) => {
    const initialTDState = Object.freeze({
        vin: null,
        date_time: null,
        seller: user.id,
        client_name: "",
        client_phone: null,
        status: null,
    });

    return (
        <Fragment>
            <h4>Добавить запись тестдрайва</h4>
        </Fragment>
    );
};
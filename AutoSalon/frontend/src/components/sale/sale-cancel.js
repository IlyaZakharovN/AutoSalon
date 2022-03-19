import React, { Fragment, useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateSale } from "../../slices/saleSlice";
import { updateCar } from "../../slices/carSlice";

const SaleCancel = ({
    sale, car, empls, user,
}) => {
    // console.log(car.VIN);

    const dispatch = useDispatch(); 
    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let salePatchData = new FormData();
    let carPatchData = new FormData();

    const patchData = async (event) => { // add notification/popups on success and on failure 
        await Promise.all([patchCar(), patchSale()]);
        await alert(`Акт продажи №${sale.id} был отменен. Необходимо произвести приемку автмомбиля с VIN ${car.VIN}.`);
        window.location.reload();
    };

    const patchSale = async (event) => { // add notification/popups on success and on failure
        await salePatchData.append('sale_status', 2);

        dispatch(updateSale({ id: sale.id, data: salePatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const patchCar = async (event) => { // add notification/popups on success and on failure 
        await carPatchData.append('status', 6);

        dispatch(updateCar({ id: car.VIN, data: carPatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        <Fragment>
            <Form onSubmit={handleSubmit(patchData)} className="form-required">
                {((user.is_sales_director || user.is_superuser || 
                (user.is_sales_manager && user.id === sale.seller)) 
                && sale.sale_status === 1) ? (
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip>
                                Продажа будет отменена. Будет необходимо произвести приемку автомобиля.
                            </Tooltip>
                        }
                    >
                        <Button 
                            type="submit" 
                            variant="outline-danger"
                        >
                            Отменить продажу
                        </Button>
                    </OverlayTrigger>
                ) : (
                    sale.sale_status === 2 ? (
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 150, hide: 400 }}
                            overlay={<Tooltip>Продажа отменена</Tooltip>}
                        >
                            <span><Button 
                                type="submit" 
                                variant="outline-danger"
                                disabled
                                style={{ pointerEvents: 'none' }}
                                >
                                Отменить продажу
                            </Button></span>
                        </OverlayTrigger>
                    ) : (
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 150, hide: 400 }}
                            overlay={
                                <Tooltip>
                                    Вы не можете отменить данный акт продажи.
                                </Tooltip>
                            }
                        >
                            <span><Button 
                                type="submit" 
                                variant="outline-danger"
                                disabled
                                style={{ pointerEvents: 'none' }}
                                >
                                Отменить продажу
                            </Button></span>
                        </OverlayTrigger>
                    )
                )}
            </Form>
        </Fragment>
    );
};

export default SaleCancel;
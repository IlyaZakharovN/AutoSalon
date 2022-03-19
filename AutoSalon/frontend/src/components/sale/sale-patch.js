import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { updateSale } from "../../slices/saleSlice";

const SaleUpdate = ({
    sale, saleTypes, saleStatuses, 
    car, carModels, addOpts,
    purch_types, empls, user, 
}) => {
    const dispatch = useDispatch(); 
    // const [addOptions, setAddOptions] = useState(sale.add_option_id);
    // console.log(Object.keys(addOptions[0]).length);
    // console.log(Object.values(sale));

    // const sale_date = new Date(sale.date);
    // const today = new Date();
    // console.log(Math.round((today - sale_date.getTime())/(1000 * 60 * 60 * 24)));

    const { register, handleSubmit, formState: { errors } } = useForm({reValidateMode: 'onChange',}); 

    let salePatchData = new FormData();

    const handleSaleChange = (event) => {
        const {name, value} = event.target;
        console.log("handleSaleChange -> " + name + ":" + value);
        if (name === "sale_document") {
            salePatchData.append(`${name}`, event.target.files[0])
        } else {
            salePatchData.append(`${name}`, value);
        }
    };
    
    const patchSale = (event) => { // add notification/popups on success and on failure 
        dispatch(updateSale({ id: sale.id, data: salePatchData }))
            .unwrap()
            .then(response => {
                console.log('response - ', response);
            })
            .catch(e => {
                console.log(e);
            });
        
        window.location.reload();
    };

    return (
        <Fragment>
            <h4>Изменить данные продажи</h4>

            {Array.isArray(car) && car.map((car) => (
                Array.isArray(carModels) && carModels
                    .filter(carModel => carModel.id === car.model_id)
                    .map((carModel) => (
                        <div className="info">
                            <p>{`Проданный автомобиль`}
                                <span>{` - `}
                                    <Link to={`/car/${car.VIN}/`}>
                                        {` ${carModel.brand} ${carModel.model} ${carModel.year} ${car.VIN}`}
                                    </Link>
                                </span>
                            </p> 
                        </div>
                    ))
                ))
            }
            
            {Array.isArray(car) && car.map(car => (
                <Form onSubmit={handleSubmit(patchSale)} className="form-required">
                    <fieldset 
                        disabled={sale.sale_status === 2 ? true : false}
                    >
                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="seller">
                                Ответственный за продажу
                            </Form.Label>
                            <Form.Select
                                {...register("seller", { required: true })}
                                size="md"
                                id="seller"
                                name="seller"
                                defaultValue={sale.seller}
                                onChange={handleSaleChange}
                            >
                                <option key='blankChoice' hidden value />
                                {user.is_sales_manager ? (
                                    <option value={user.id} key={user.id}>
                                        {`${user.name} - менеджер по продажам`}
                                    </option>
                                ) : (
                                    Array.isArray(empls) && 
                                        empls.map((empl, index) => (
                                            <option value={empl.id} key={empl.id}>
                                                {empl.is_sales_director ? (
                                                    `${empl.name} - директор по продажам`
                                                ) : (
                                                    `${empl.name} - менеджер по продажам`
                                                )}
                                            </option>
                                        ))
                                )}
                            </Form.Select>
                        </Form.Group>  
                        {errors.seller && <p>Необходимо выбрать ответственного за продажу.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="purchase_type">
                                Вид приобретения покупателем
                            </Form.Label>
                            <Form.Select
                                {...register("purchase_type", { required: true })}
                                size="md"
                                id="purchase_type"
                                name="purchase_type"
                                defaultValue={sale.purchase_type}
                                onChange={handleSaleChange}
                            >
                                <option key='blankChoice' hidden value />
                                {Array.isArray(purch_types) && 
                                    purch_types.map((purch_type, index) => (
                                        <option value={purch_type.id} key={purch_type.id}>
                                            {`${purch_type.name}, коэффициент цены - x${purch_type.coefficient}`}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group> 
                        {errors.purchase_type && <p>Необходимо выбрать вид приобретения.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="sale_type">
                                Вид продажи
                            </Form.Label>
                            <Form.Select
                                {...register("sale_type", { required: true })}
                                size="md"
                                id="sale_type"
                                name="sale_type"
                                defaultValue={sale.sale_type}
                                onChange={handleSaleChange}
                            >
                                <option key='blankChoice' hidden value />
                                {Array.isArray(saleTypes) && 
                                    saleTypes.map((saleType, index) => (
                                        <option value={saleType.id} key={saleType.id}>
                                            {`${saleType.name}`}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group> 
                        {errors.sale_type && <p>Необходимо выбрать вид продажи.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="sale_price">
                                Цена продажи автомобиля (руб.)
                            </Form.Label>
                            <Form.Text>
                                <br/>Цена должна находиться в пределах 1 - 999999999,99 рублей.
                            </Form.Text>
                            <Form.Control
                                {...register("sale_price", { required: true })}
                                size="md"
                                type="number"
                                step="0.01"
                                min={0}
                                max={999999999.99}
                                id="sale_price"
                                name="sale_price"
                                defaultValue={sale.sale_price}
                                onChange={handleSaleChange}
                            />
                        </Form.Group>
                        {errors.sale_price && <p>Необходимо указать цену продажи автомобиля.</p>}

                        <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="customer_info">
                                Информация о покупателе
                            </Form.Label>
                            <Form.Text>
                                <br/>Укажите ФИО, серию и номер пасспорта, номер счета и т.д.
                            </Form.Text>
                            <textarea
                                {...register("customer_info", { required: true })}
                                className="form-control"
                                rows="5"
                                size="md"
                                type="text"
                                id="customer_info"
                                name="customer_info"
                                defaultValue={sale.customer_info}
                                onChange={handleSaleChange}
                            />
                        </Form.Group> 
                        {errors.customer_info && <p>Необходимо указать информацию о покупателе.</p>} 

                        {/* <Form.Group className='mb-3'>
                            <Form.Label className='mb-1' htmlFor="add_option_id">
                                Дополнительное оборудование
                            </Form.Label>
                            <Form.Text>
                                <br/>Выберите дополнительное оборудование для установки по желанию клиента.<br/>
                            </Form.Text>
                            <Form.Text>
                                {`Дополнительное оборудование`} {Array.isArray((sale.add_option_id)) && (Object.keys(sale.add_option_id).length) ? (
                                <span>{` - установлены:`}
                                    {Array.isArray(Object.values(sale.add_option_id)) && Object.values(sale.add_option_id)
                                        .map((addOpt) => (
                                            Array.isArray(addOpts) && addOpts
                                            .filter(addOption => addOption.id === addOpt)
                                            .map((addOption, index) => (
                                                <span key={addOpt}><br/>
                                                <Link to={`/add-options/${addOption.id}`} >{`${addOption.name} (${addOption.price} руб.)`}</Link>
                                                </span>
                                            ))    
                                        ))
                                    }
                                </span>) : (
                                    <span>{`не установлены.`}</span>
                                )}
                            </Form.Text>
                            {Array.isArray(addOpts) && addOpts.map((addOpt) => (
                                // Array.isArray(Object.values(sale.add_option_id)) && Object.values(sale.add_option_id)
                                //     .map((add) => (
                                // Array.isArray(addOptions) && addOptions
                                //     .map((add) => (
                                    
                                <Form.Check
                                    {...register("add_option_id")}
                                    style={{textAlign: "left"}}
                                    id={`addOpts-cb-${addOpt.id}`}
                                    label={`${addOpt.name} - ${addOpt.price} руб.`}
                                    name={addOpt.name}
                                    // defaultValue={addOpt.id}
                                    // defaultChecked={add.id}
                                    value={addOpt.id}
                                    onChange={handleAddOptChange}
                                />
                                // ))
                            ))}
                        </Form.Group> */}

                        <Form.Group className='mb-3'> 
                            <Form.Label className='mb-1' htmlFor="sale_document">
                                Документ приемки
                            </Form.Label>
                            <Form.Text>
                                <br/>При необходимости прикрепите новый документ приемки.
                            </Form.Text>
                            <Form.Control
                                {...register("sale_document")}
                                className="form-control"
                                size="md"
                                type="file"
                                accept=".png, .jpg., .jpeg, .doc, .docx, .pdf, application/msword"
                                id="sale_document"
                                name="sale_document"
                                // defaultValue={sale.sale_document}
                                onChange={handleSaleChange}
                            />
                        </Form.Group>

                        <div>
                            <button 
                                type="submit" 
                                className="btn btn-primary btn-block"
                            >
                                Обновить информацию
                            </button>
                        </div>

                    </fieldset>
                </Form>
            ))}

        </Fragment>
    );
};

export default SaleUpdate;
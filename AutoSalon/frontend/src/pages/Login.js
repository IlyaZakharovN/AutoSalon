import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import httpCommon from '../http-common';
import { retriveUserData } from '../slices/userSlice';

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialFormData = Object.freeze({
		email: '',
        name: '',
		// password: '',
        // is_superuser: null,
        // is_active: null,
        // is_staff: null,
        // is_sales_director: null,
        // is_sales_manager: null,
        // is_puchase_manager: null,
        // is_tech_inspector: null,
	});

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

    // const getUserDetails = () => {
    //     httpCommon
    //         .get(`me/`, {
    //             Authorization: localStorage.getItem('access_token'),
    //         }).then((res)=> {
    //             console.log(res);
    //             localStorage.setItem('is_superuser', res.data.is_superuser);
    //             localStorage.setItem('is_sales_director', res.data.is_sales_director);
    //             localStorage.setItem('is_sales_manager', res.data.is_sales_manager);
    //             localStorage.setItem('is_tech_inspector', res.data.is_tech_inspector);
    //             console.log('is_superuser - ', localStorage.getItem('is_superuser'));
    //             console.log('is_sales_director - ', localStorage.getItem('is_sales_director'));
    //             console.log('is_sales_manager - ', localStorage.getItem('is_sales_manager'));
    //             console.log('is_tech_inspector - ', localStorage.getItem('is_tech_inspector'));
    //         })
    // };

    const userLogin = () => { // add 'user not found'
        httpCommon
            .post(`api/token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                httpCommon.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                console.log(res.data);
                navigate('/profile');
            })
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        dispatch(userLogin);
        // window.location.reload();
	};

    return (
        <form>
            <h3>Вход</h3>
            <div className='form-group'>
                <label>Адрес электронной почты</label>
                <input 
                    type="email" 
                    className='form-control' 
                    onChange={handleChange}
                    required
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
                    placeholder='Введите адрес электронной потчы'
                />
            </div>
            <div className='form-group'>
                <label>Пароль</label>
                <input 
                    required
                    className='form-control' 
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    placeholder='Введите пароль'
                />
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary btn-block"
                onClick={handleSubmit}
            >
                Submit
            </button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
};
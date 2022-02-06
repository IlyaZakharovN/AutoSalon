import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { userSelector, retriveUserData } from "../slices/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const { isAuthenticated, is_superuser, is_sales_director } = useSelector(userSelector);

    const searchBar = () => (
            <form action="" className="form-inline my-2 my-lg-0">
                <input 
                    type="text"
                    className="form-control mr-sm-2"
                    placeholder="Поиск..."
                />
                <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
                    Поиск
                </button>
            </form>
    );

    const guestLinks = () => (
        <Fragment>
            <Link className="nav-link" to="/carmodels/">Каталог</Link>
            <Link className="nav-link" to="/">Тест-драйв</Link>
            <Link className="nav-link" to="/">О нас</Link>
            <Link className="nav-link" to="/login">Вход для сотрудников</Link>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <Link className="nav-link" to="/carmodels/">Каталог</Link>
            <Link className="nav-link" to="/">Тест-драйв</Link>
            <Link className="nav-link" to="/cars/">Автомобили в наличии</Link>
            <Link className="nav-link" to="/">Доп. опции</Link>
            <Link className="nav-link" to="/">Продажи</Link>
            <Link className="nav-link" to="/">Тех. экспертиза</Link>
            <Link className="nav-link" to="/">О нас</Link>
            <Link className="nav-link" to="/logout">Выход</Link>
        </Fragment>
    );

    const directorOrSuperLinks = () => (
        <Fragment>
            <Link className="nav-link" to="/carmodels/">Каталог</Link>
            <Link className="nav-link" to="/">Тест-драйв</Link>
            <Link className="nav-link" to="/cars/">Автомобили в наличии</Link>
            <Link className="nav-link" to="/">Доп. опции</Link>
            <Link className="nav-link" to="/">Продажи</Link>
            <Link className="nav-link" to="/">Тех. экспертиза</Link>
            <Link className="nav-link" to="/">Статистика сотрудников</Link>
            <Link className="nav-link" to="/">О нас</Link>
            <Link className="nav-link" to="/logout">Выход</Link>
        </Fragment>
    );
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container collapse navbar-collapse" id="navbarNav">
                <Link className="navbar-brand" to="/">Главная</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {isAuthenticated && (is_superuser || is_sales_director) ? directorOrSuperLinks() : 
                        (isAuthenticated ? authLinks() : guestLinks())}
                </ul>
                {searchBar()}
            </div>
        </nav>
        // {authLinks()}
    );
};

export default Navbar;
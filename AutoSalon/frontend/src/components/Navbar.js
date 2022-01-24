import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const guestLinks = () => (
        <Fragment>
                <Link className="nav-link" to="/carmodels/">Каталог</Link>
            {/* <li className="nav-item active">
            </li> */}
                <Link className="nav-link" to="/">Тест-драйв</Link>
            {/* <li className="nav-item">
            </li> */}
                <Link className="nav-link" to="/">О нас</Link>
            {/* <li className="nav-item">
            </li> */}
                <Link className="col align-self-end nav-link" to="/">Вход для сотрудников</Link>
            {/* <li className="nav-item">
            </li> */}
        </Fragment>
    );

    const authLinks = () => (
        <li className="nav-item">Вход для сотрудников</li>
    );
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Главная</Link>
            <div className="container collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {guestLinks()}
                    {/* <li className="nav-item active">
                    </li> */}
                </ul>
            </div>
        </nav>
        // {authLinks()}
    );
};

export default Navbar;
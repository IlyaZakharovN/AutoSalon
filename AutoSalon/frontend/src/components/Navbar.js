import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import { userSelector, retriveUserData } from "../slices/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
    const { isAuthenticated, user } = useSelector(userSelector);

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
            <Nav className="me-auto">
                <Nav.Link href="/carmodels/">Каталог</Nav.Link>

                <NavDropdown title="Автомобили" id="basic-nav-dropdown">
                    <Nav.Link href="/cars/">Авто в наличии</Nav.Link>
                    <Nav.Link href="/add-options/">Доп. оборудование</Nav.Link>
                </NavDropdown>

                <Nav.Link href="/testdrives/">Тест-драйв</Nav.Link>
                <Nav.Link href="/">О нас</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/login/">Вход для сотрудников</Nav.Link>
            </Nav>
        </Fragment>
    );

    const authLinks = () => (
        <Fragment>
            <Nav className="me-auto">
                <Nav.Link href="/carmodels/">Каталог</Nav.Link>

                <NavDropdown title="Автомобили" id="basic-nav-dropdown">
                    <Nav.Link href="/cars/">Авто в наличии</Nav.Link>
                    <Nav.Link href="/add-options/">Доп. оборудование</Nav.Link>
                </NavDropdown>

                <Nav.Link href="/testdrives/">Тест-драйв</Nav.Link>
                <Nav.Link href="/sales/">Продажи</Nav.Link>
                
                <NavDropdown title="Тех. экспертиза" id="basic-nav-dropdown">
                    <Nav.Link href="/tech-inspections/">Тех. осмотры</Nav.Link>
                    <Nav.Link href="/tech-inspection-requests/">Заявки на тех. осмотры</Nav.Link>
                </NavDropdown>

                <Nav.Link href="/">О нас</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/profile/">Профиль</Nav.Link>
                <Nav.Link href="/logout/">Выход</Nav.Link>
            </Nav>
        </Fragment>
    );

    // const directorOrSuperLinks = () => (
    //     <Fragment>
    //         <Link className="nav-link" to="/carmodels/">Каталог</Link>
    //         <Link className="nav-link" to="/testdrives">Тест-драйв</Link>
    //         <Link className="nav-link" to="/cars/">Автомобили в наличии</Link>
    //         <Link className="nav-link" to="/add-options/">Доп. оборудование</Link>
    //         <Link className="nav-link" to="/sales/">Продажи</Link>
    //         <Link className="nav-link" to="/tech-inspections/">Тех. экспертиза</Link>
    //         <Link className="nav-link" to="/profile">Профиль</Link>
    //         <Link className="nav-link" to="/">Статистика сотрудников</Link>
    //         <Link className="nav-link" to="/">О нас</Link>
    //         <Link className="nav-link" to="/logout">Выход</Link>
    //     </Fragment>
    // );
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Главная</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuthenticated ? (
                        authLinks()
                    ) : (
                        guestLinks()
                    )}
                    {/* {searchBar()} */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
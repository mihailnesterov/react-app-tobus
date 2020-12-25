import React from 'react';
import { NavLink } from "react-router-dom";
import { Nav } from 'reactstrap';
import { faBus, faMapMarkerAlt, faTaxi, faShippingFast, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainMenu() {
    return (
        <Nav className="d-flex align-items-end justify-content-around justify-content-sm-center p-0 m-0">
            <NavLink to="/" 
                className="m-2 text-dark shadow-sm px-2 py-2 bg-light d-sm-flex align-items-sm-center" 
                style={{"minWidth":"42px","maxWidth":"165px"}}>
                <FontAwesomeIcon icon={faBus} size={"2x"} className="mr-sm-2 text-success"/>
                <span className="d-none d-sm-inline">Маршруты</span>
            </NavLink>
            <NavLink to="/stations" 
                className="m-2 text-dark shadow-sm px-2 py-2 bg-light d-sm-flex align-items-sm-center" 
                style={{"minWidth":"42px","maxWidth":"165px"}}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={"2x"} className="mr-sm-2 text-primary"/>
                <span className="d-none d-sm-inline">Остановки</span>
            </NavLink>
            <NavLink to="/taxi" 
                className="m-2 text-dark shadow-sm px-2 py-2 bg-light d-sm-flex align-items-sm-center" 
                style={{"minWidth":"42px","maxWidth":"165px"}}>
                <FontAwesomeIcon icon={faTaxi} size={"2x"} className="mr-sm-2 text-warning"/>
                <span className="d-none d-sm-inline">Такси</span>
            </NavLink>
            <NavLink to="/" 
                className="m-2 text-dark shadow-sm px-2 py-2 bg-light d-sm-flex align-items-sm-center" 
                style={{"minWidth":"42px","maxWidth":"165px"}}>
                <FontAwesomeIcon icon={faShippingFast} size={"2x"} className="mr-sm-2 text-danger"/>
                <span className="d-none d-sm-inline">Доставка</span>
            </NavLink>
            <NavLink to="/" 
                className="m-2 text-dark shadow-sm px-2 py-2 bg-light d-sm-flex align-items-sm-center" 
                style={{"minWidth":"42px","maxWidth":"165px"}}>
                <FontAwesomeIcon icon={faTruck} size={"2x"} className="mr-sm-2 text-info"/>
                <span className="d-none d-sm-inline">Транспорт</span>
            </NavLink>
        </Nav>
    );
}

export default MainMenu;

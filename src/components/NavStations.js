import React from 'react';
import { NavLink } from "react-router-dom";
import { Nav, ButtonToggle } from 'reactstrap';

function NavStations(props) {
    console.log(props.stations)
    return (
        <Nav className="d-flex align-items-start justify-content-center p-0 m-0">
        { props.stations.map( item =>  
                <NavLink to={`/stations/${item.id}`} key={item.id}>
                    <ButtonToggle 
                        key={item.id}
                        color="warning" 
                        size="lg" 
                        className="m-2 shadow-sm border text-dark"
                        style={{"minWidth":"auto"}}
                    >{item.name}
                    </ButtonToggle>
                </NavLink>
            )}
        </Nav>
    );
}

export default React.memo(NavStations);

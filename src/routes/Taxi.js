import React, { useEffect } from 'react';
import { Nav, NavLink, ButtonToggle } from 'reactstrap';
import DataTaxi from '../hooks/fetchTaxi';
import HeaderDefault from '../components/HeaderDefault'

function Taxi(props) {
    useEffect( () => {
        const setTitle = async () => document.title = await props.pageTitle;
        setTitle()
    }, [props.pageTitle])
    const taxi = Object.values( JSON.parse( DataTaxi() ) );
    return (
        <div>
            <HeaderDefault pageTitle={props.pageTitle} />
            <Nav className="d-flex align-items-start justify-content-center p-0 m-0">
            { taxi.map( item =>  
                    <NavLink href={"tel:" + item.phone} key={item.id}>
                        <ButtonToggle 
                            key={item.id}
                            color="light" 
                            size="lg" 
                            className="m-2 shadow-sm border"
                            style={{"minWidth":"220px"}}
                        ><span className="text-info">{item.phone}</span> 
                        <br/> {item.name}  <br/> <small>{item.comment}</small>
                        </ButtonToggle>
                    </NavLink>
                )}
            </Nav>
        </div>
    );
}

export default Taxi;

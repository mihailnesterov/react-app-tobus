import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'reactstrap';

function NavStationsFilterGroup(props) {
    const [more, setMore] = useState(false);
    
    const onToggleMore = e => { 
        e.preventDefault();
        setMore(!more)
    };

    return (
        <ListGroup flush 
            className="text-left mr-md-2 mb-3 mb-md-1 position-relative" 
            style={{
                "overflowY": more ? "visible" : "hidden",
                "height": more ? "auto" : "55px",
                "minWidth":"27%",
            }}>
            {<ListGroupItem
                className="small text-dark shadow-sm border-bottom pl-2 pt-2 pb-2 pr-0 mb-1 d-flex align-items-end justify-content-between" 
                style={{"backgroundColor":"transparent"}} 
                tag="h5">
                    <span>{props.area}</span> {props.items.length === 0 ? <span className="px-2 text-danger">Не найдено...</span> : <span className="px-2 text-success">Найдено...<b>{props.items.length}</b></span>}
            </ListGroupItem>}
            { props.items.length > 0 ?
                props.items.map( (item, index) => 
                    <ListGroupItem 
                        key={item.id} 
                        tag="li"
                        className={index === +props.items.length-1 ? "px-0 py-1 border-bottom-0" : "px-0 py-1" }
                        >
                        <NavLink 
                            key={item.id} 
                            className="border-0 px-2 py-1 text-primary" 
                            style={{"backgroundColor":"transparent"}} 
                            tag="a" 
                            to={"/stations/" + item.id}
                            >
                            { item.name }
                        </NavLink>
                    </ListGroupItem>
                ) : false
            }

            { props.items.length > 1 ? 
            <a href="#wrapper" 
                className="small text-info text-underline position-absolute"
                style={{
                    "bottom":"1px", 
                    "right":"8px", 
                    "zIndex":"9"}} 
                onClick={ onToggleMore } >
                { more ?  'Свернуть' : 'Еще..' + (props.items.length === 2 ? 1 : props.items.length-1) }
            </a> : false}
            
        </ListGroup>
    );
}

export default NavStationsFilterGroup;

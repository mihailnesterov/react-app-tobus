import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

function BusesFilterGroup(props) {
    const [url] = useState("http://localhost:5000/api/query/" + props.query + "/" + props.season + "/" + props.day);
    const [buses, setBuses] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить данные...");
    const [more, setMore] = useState(false);

    useEffect(() => {
        // fetch buses
        if( props.query !== '') {
            try {
                const fetchData = async () => {
                    await fetch(url)
                        .then(res => res.json())
                        .then(res => setBuses(res.rows))
                        .catch(err => setErrors(err));
                }
                fetchData();
            } catch (error) {
                console.log('useEffect fetch buses error',error);
                if(hasError) {
                    console.log(errorMsg);
                }
            }
        }
    }, [url,hasError,errorMsg]);

    

    useEffect( () => {
        console.log('buses', buses)
    }, [buses])
    
    const onToggleMore = (event) => { 
        event.preventDefault();
        setMore(!more)
    };

    return (
        <ListGroup flush 
            className="border-0 text-left" 
            style={{
                "overflowY": more ? "visible" : "hidden",
                "height": more ? "auto" : "55px"
                
            }}>
            {<ListGroupItem
                className="small border-bottom pl-2 pt-1 pb-2 mb-1" 
                style={{"backgroundColor":"transparent"}} 
                tag="h5">
                    {props.area}
            </ListGroupItem>}
            { props.items.length > 0 ?
                buses.map( ( bus, index ) => 
                <ListGroupItem 
                    key={index} 
                    className="border-0 px-2 py-1 text-primary" 
                    style={{"backgroundColor":"transparent"}} 
                    tag="a" 
                    href="#" 
                    onClick={props.click}
                    >
                        { bus.num }
                </ListGroupItem>) :
                <p className="text-danger px-2 py-1">Не найдено</p>
            }

            { props.items.length > 1 ? 
            <a href="#wrapper" 
                className="small text-secondary position-absolute"
                style={{"bottom":"11px", "right":"20px"}} 
                onClick={ onToggleMore } >
                { more ?  'Свернуть' : 'Еще..' + (props.items.length === 2 ? 1 : props.items.length-1) }
            </a> : false}
            
        </ListGroup>
    );
}

export default BusesFilterGroup;

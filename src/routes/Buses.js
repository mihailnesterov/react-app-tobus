import React, { useState, useMemo } from 'react';
import { getAllBuses, getBusesCount } from '../api/BusesAPI';
import { NavLink } from "react-router-dom";
import { Nav, ButtonToggle, Button, ButtonGroup, Input } from 'reactstrap';
import HeaderDefault from '../components/HeaderDefault'

function Buses(props) {
    
    const [optionsOnPageCount] = useState([2,3,5,10,50]);
    const [limit, setLimit] = useState(optionsOnPageCount[1]);
    
    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить маршруты...");
    
    const [buses, setBuses] = useState([]);
    const [busesCount, setBusesCount] = useState(0);
    useMemo(() => {
        try {
            getBusesCount()
                    .then(res => res.json())
                    .then(res => setBusesCount(res.rows[0].count))
                    .catch(err => setErrors(err));
        } catch (error) {
            console.log('useMemo get buses count error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [hasError,errorMsg]);

    const [pagination, setPaginations] = useState([]);
    const [pageSelected, setPageSelected] = useState(0);
    useMemo( () => {
        const pages = [];
        const count = Math.ceil(busesCount/limit);
        for (let i = 0; i < count; i++) {
            pages.push({
                index: i,
                num: (i+1),
                active: pageSelected,
                first: i === 0 ? true : false,
                last: count === (i+1) ? true : false
            });
        }
        setPaginations(pages);
    }, [busesCount, pageSelected, limit])

    useMemo(() => {
        try {
            getAllBuses(pageSelected,limit)
                    .then(res => res.json())
                    .then(res => setBuses(res.rows))
                    .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch buses error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [pageSelected,limit,hasError,errorMsg]);

    useMemo( () => {
        const setTitle = async () => document.title = await props.pageTitle;
        setTitle()
    }, [props.pageTitle])
    
    return (
        <div>
            <HeaderDefault pageTitle={props.pageTitle} />

            { limit === 0 || pagination.length === 1 ? 
                false : 
                <div className="mb-2 d-flex align-items-center justify-content-between justify-content-md-center flex-wrap">
                    <ButtonGroup className="mx-3">
                        { pagination.map( item => 
                            <Button 
                                key={item.index} 
                                size="sm" 
                                color={pageSelected === item.index ? "secondary" : "light" }
                                onClick={() => setPageSelected(item.index)} 
                                active={pageSelected === item.index}
                                className="shadow-none border-0"
                                style={{width:"35px",height:"30px"}}
                            >
                                {item.num}
                            </Button>
                        ) }
                    </ButtonGroup>
                    <Input 
                        type="select" 
                        name="selectOnPageCount" 
                        id="selectOnPageCount" 
                        style={{width:"55px",height:"32px"}}
                        className="px-3 mx-3 text-dark"
                        onChange={e => { 
                            setLimit(e.currentTarget.value);
                            setPageSelected(0);
                        }}
                        defaultValue={optionsOnPageCount[1]}
                    >
                        { optionsOnPageCount.map( item => <option key={item} value={item}>{item}</option>) }
                    </Input>
                </div>
                }

            
            <Nav className="d-flex align-items-start justify-content-center p-0 m-0">
                {buses.map( bus =>  
                    <NavLink to={"/buses/" + bus.id} key={bus.id} >
                        <ButtonToggle 
                            key={bus.id}
                            color="warning" 
                            size="lg" 
                            className="m-2 text-dark shadow-sm border"
                            style={{"minWidth":"56.25px"}}
                        >{bus.num}
                        </ButtonToggle>
                    </NavLink>
                )}
            </Nav>
            
        </div>
    );
}

export default React.memo(Buses);

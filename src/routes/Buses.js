import React, { useState, useMemo } from 'react';
import { getAllBuses, getBusesCount } from '../api/BusesAPI';
import { NavLink } from "react-router-dom";
import { Nav, ButtonToggle } from 'reactstrap';
import HeaderDefault from '../components/HeaderDefault'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader';

function Buses(props) {
    
    const [optionsOnPageCount] = useState([2,3,5,10,50]);
    const defaultValueOnPageCount = optionsOnPageCount[1];
    const [limit, setLimit] = useState(defaultValueOnPageCount);
    const [isLoaderOpen, setLoaderOpen] = useState(false);
    
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

    const [pageSelected, setPageSelected] = useState(0);
    useMemo(() => {
        try {
            setLoaderOpen(true)
            getAllBuses(pageSelected,limit)
                .then(res => res.json())
                .then(res => setBuses(res.rows))
                .then(() => setLoaderOpen(false))
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
            <Loader isOpen={isLoaderOpen} />
            <HeaderDefault pageTitle={props.pageTitle} />
            <Pagination 
                pageSelected={pageSelected}
                setPageSelected={setPageSelected}
                limit={+limit}
                setLimit={setLimit}
                options={optionsOnPageCount}
                defaultValue={defaultValueOnPageCount}
                busesCount={busesCount}
            />
            
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

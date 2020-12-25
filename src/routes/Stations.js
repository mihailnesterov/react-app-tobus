import React, { useState, useEffect } from 'react';
import { Form, Input, FormGroup, Alert } from 'reactstrap';
import NavStations from '../components/NavStations';
import StationsFilterGroup from '../components/StationsFilterGroup';
import NavStationsFilterGroup from '../components/NavStationsFilterGroup';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stations(props) {

    const [url] = useState("http://localhost:5000/api/stations");
    const [stations, setStations] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить остановки...");
    
    const [areas, setAreas] = useState([]);
    const [areas_visible, setAreasVisible] = useState(false);
    const onDismissAreas = () => setAreasVisible(false);
    const onAcceptAreas = () => setAreasVisible(true);
    
    const [tags, setTags] = useState([]);
    const [tags_visible, setTagsVisible] = useState(false);
    const onDismissTags = () => setTagsVisible(false);
    const onAcceptTags = () => setTagsVisible(true);

    const [buses, setBuses] = useState([]);
    const [buses_visible, setBusesVisible] = useState(false);
    const onDismissBuses = () => setBusesVisible(false);
    const onAcceptBuses = () => setBusesVisible(true);
    
    // set title
    useEffect( () => {   
        const setTitle = async () => document.title = await props.pageTitle;
        setTitle()
    }, [props.pageTitle])
    // fetch stations
    useEffect(() => {     
        try {
            const fetchData = async () => {
                await fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        setStations(res.rows)
                        setAllStations(res.rows)
                    })
                    .catch(err => setErrors(err));
            }
            fetchData();
        } catch (error) {
            console.log('useEffect fetch stations error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
        
    }, [url,hasError,errorMsg]);
    // set areas
    useEffect( () => {
        setAreas(stations.length > 0 
        ? [...new Set( stations.map( station => station.area )
            .reduce( (res,area) => res + ',' + area )
            .split(',')
            .map( item => item.trim() ))]
            .sort()
        : []);
    }, [stations])
    // set tags
    useEffect( () => {       
        setTags(stations.length > 0 
        ? [...new Set( stations.map( station => station.tags )
            .reduce( (res,tag) => res + ',' + tag )
            .split(',')
            .map( item => item.trim() ))]
            .sort()
        : []);
    }, [stations])
    // fetch buses
    useEffect(() => {  
        try {
            const fetchData = async () => {
                await fetch("http://localhost:5000/api/buses")
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
        
    }, [hasError,errorMsg]);
    // clear search input
    const clearInput = e => {
        
        e.preventDefault();
        
        try {
            setStations(allStations);
            onDismissAreas();
            onDismissTags();
            onDismissBuses();
            document.getElementById("input-search-stations").value = '';
        } catch (error) {
            console.log('useEffect clear input error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
        
    }
    // form handler
    const searchFormHandler = e => {
        
        e.preventDefault();
        
        onDismissAreas();
        onDismissTags();
        onDismissBuses();
        
    }
    // filter stations
    const filterStations = e => {

        if( e.currentTarget.innerText && !e.currentTarget.value ) {
            e.preventDefault();
        }

        const value = e.currentTarget.value || e.currentTarget.innerText;

        if( value === '' ) {

            setStations( allStations );
            onDismissAreas();
            onDismissTags();
            onDismissBuses();

        } else {

            if( e.currentTarget.innerText && !e.currentTarget.value ) {
                document.getElementById("input-search-stations").value = value
            }

            const filtered = allStations.filter( state => {
                const regex = new RegExp(value, 'ig');
                return state.name.match(regex) || state.area.match(regex) || state.tags.match(regex);
            });

            setStations( filtered.length > 0 ? filtered : [] );
            onAcceptAreas();
            onAcceptTags();
            onAcceptBuses();
        }
        
    }

    return (
        <div className="p-0">
            
            <Form onSubmit={searchFormHandler} className="bg-gray-light p-3">
                <FormGroup className="mx-auto position-relative bg-white mb-0">
                    
                    <Input 
                        onFocus={filterStations}
                        onInput={filterStations} 
                        id="input-search-stations" 
                        placeholder="Найти остановку..." 
                        className={ stations.length > 0 ? 
                            'border-success text-success pl-3' : 
                            'border-danger text-danger pl-3'}
                        bsSize="lg" 
                        autoComplete="off"
                    />

                    <a href="#wrapper" 
                        className="position-absolute" 
                        title="Очистить поиск"
                        style={{
                            "right":"3px", 
                            "top":"13px", 
                            "zIndex":"9",
                            "padding": "5px 11px 5px 11px"
                        }}
                        onClick={clearInput} >
                        <FontAwesomeIcon icon={faTimes} style={{"color":"#bbb"}} />
                    </a>

                    <Alert color="secondary" 
                        isOpen={areas_visible} 
                        toggle={onDismissAreas} 
                        className="position-absolute shadow d-md-flex align-items-md-start justify-content-md-start"
                        closeClassName="text-secondary"
                        style={{
                            "right":"0", 
                            "left":"0", 
                            "top":"58px", 
                            "zIndex":"9",
                            }} >
                        <NavStationsFilterGroup 
                            area={'Остановки'}
                            items={stations} />
                        
                        <StationsFilterGroup 
                            area={'Районы'}
                            items={areas} 
                            filterStations={filterStations} />

                        <StationsFilterGroup 
                            area={'Улицы, адреса, объекты'}
                            items={tags} 
                            filterStations={filterStations} />

                    </Alert>

                    <div className="position-absolute shadow-sm small d-none -d-md-flex p-0 my-0 mx-auto align-items-md-start justify-content-md-between"
                        style={{
                            //"maxWidth":"600px",
                            "right":"0", 
                            "left":"0", 
                            "top":"58px", 
                            "zIndex":"9",
                            "backgroundColor":"rgba(255,255,255,0.85)",
                            }} >
                    
                        

                        {/*<Alert color="light" 
                            isOpen={tags_visible} 
                            toggle={onDismissTags} 
                            className="shadow-sm d-md-flex m-2 align-items-md-start justify-content-md-between">

                            <StationsFilterGroup 
                                area={'Улица, адрес, объект'}
                                items={tags} 
                                click={filterStations} />

                        </Alert>

                        <Alert color="light" 
                            isOpen={buses_visible} 
                            toggle={onDismissBuses} 
                            className="shadow-sm d-md-flex m-2 align-items-md-start justify-content-md-between">


                            <StationsFilterGroup 
                                area={'Маршрут'}
                                items={tags} 
                                click={filterStations} />
                            {<BusesFilterGroup 
                                area={'Маршрут'}
                                query={document.getElementById("input-search-stations").value || ''} 
                                season={1} 
                                day={1}
                                click={filterStations} />}
                            
                        </Alert>*/}
                    </div> 
                    
                </FormGroup>
                
                 
            </Form>
            
            <NavStations stations={stations}/>
        </div>
    );
}

export default Stations;

import React, { useState, useEffect, useMemo } from 'react';
import { getBus, getBusStations } from '../api/BusesAPI';
import { getAllStations } from '../api/StationsAPI';
import { getAllSeasons } from '../api/SeasonsAPI';
import { getAllDays } from '../api/DaysAPI';

import BusStationItem from '../components/BusStationItem';
import { Row, Col, Button } from 'reactstrap';

function Bus(props) {

    const [season, setSeason] = useState(() => {
        const date      = new Date();
        const month     = date.getMonth();
        const summer    = [5,6,7,8,9,10].filter( m => m === month);
        const winter    = [11,12,1,2,3,4].filter( m => m === month);
        
        return  winter.length > 0 
                && summer.length === 0 
                ? {id:1,name:'Зима'} : {id:2,name:'Лето'} // кастыль, но быстрый...
    });
    
    const [day, setDay] = useState(() => {
        const date      = new Date();
        const weekday   = date.getDay();
        const workdays  = [1,2,3,4,5].filter( d => d === weekday); // №№ рабочих дней
        const holydays  = [6,7].filter( d => d === weekday);       // №№ выходных дней
        const dd        = date.getDate(); 
        const mm        = date.getMonth() + 1; 
        const yyyy      = date.getFullYear();
        const today = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
        
        const calendar  = [
            // здесь задаем праздничные даты, по которым также будут определяться выходные
            '01.01.2020',
            '08.03.2020',
        ].filter( item => item === today );

        return  workdays.length > 0 
                && holydays.length === 0 
                && calendar.length === 0 
                ? {id:1,name:'Рабочие'} : {id:2,name:'Выходные'} // кастыль, но быстрый...
    });

    const [time, setTime] = useState({});
    useEffect(() => {
        const date = new Date();
        setTime({
            hours: date.getHours(),
            minutes: date.getMinutes()
        });
    }, [season,day]);

    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить данные...");

    const [bus, setBus] = useState([]);
    useEffect(() => {
        try {
            getBus(props.match.params.id)
                .then(res => res.json())
                .then(res => setBus(res.rows.map(item => item )[0]))
                .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch bus error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [props,hasError,errorMsg]);
    useEffect( () => {
        const setTitle = async () => document.title = await props.pageTitle + ' ' + bus.num;
        setTitle()
    }, [bus,props])

    const [busStations, setBusStations] = useState([]);
    useEffect(() => {
        try {
            getBusStations(props.match.params.id, day.id, season.id)
                    .then(res => res.json())
                    .then(res => setBusStations(res.rows))
                    .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch bus stations error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [props.match.params.id, day.id, season.id,hasError,errorMsg]);

    const [seasons, setSeasons] = useState([]);
    useMemo(() => {
        try {
            getAllSeasons()
                .then(res => res.json())
                .then(res => setSeasons(res.rows))
                .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch seasons error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [hasError,errorMsg]);

    const [days, setDays] = useState([]);
    useMemo(() => {
        try {
            getAllDays()
                .then(res => res.json())
                .then(res => setDays(res.rows))
                .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch days error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    }, [hasError,errorMsg]);

    const [stations, setStations] = useState([]);
    useEffect(() => {
        try {
            getAllStations()
                .then(res => res.json())
                .then(res => setStations(res.rows.filter( item => [...new Set(busStations.map((el) => el.station_id))].includes(item.id))))
                .catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch stations error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    },[busStations,seasons,days,hasError,errorMsg]);

    return (
        <Row className="mt-0">
            <Col xs="12">
                <div className="bg-gray shadow-sm p-1 mt-0 mb-3 d-flex align-items-center justify-content-between">
                    <h2 className="m-2">{ bus.num ? <span className="d-block bg-warning py-1 px-2 text-white shadow-sm">{ bus.num }</span> : false }</h2>
                    { bus.owner ? <p className="small m-0 p-2 text-dark text-center">{ bus.owner }</p> : false }
                    {/* bus.comment ? <p className="border small text-secondary py-2 px-3 my-2">{ bus.comment }</p> : false */}
                    <div className="m-0 days">
                        { days.map( item =>
                            <Button 
                                key={item.id}
                                onClick={ () => setDay({ id:item.id, name:item.name })}
                                color={+day.id === +item.id ? "light" : "link"}
                                size="sm" 
                                active={+day.id === +item.id}
                                className={ +day.id === +item.id ? "text-dark shadow-sm py-1 px-2" : "text-light py-1 px-2" }
                                >
                                {item.name}
                            </Button>
                        )}
                    </div>
                    <div className="m-0 seasons">
                        { seasons.map( item =>
                            <Button 
                                key={item.id}
                                onClick={ () => setSeason({ id:item.id, name:item.name }) }
                                color={ +season.id === +item.id ? "light" : "link" }
                                size="sm" 
                                active={ +season.id === +item.id }
                                className={ +season.id === +item.id ? "text-dark shadow-sm py-1 px-2" : "text-light py-1 px-2" }
                                >
                                {item.name}
                            </Button>
                        )}
                    </div>
                </div>
                <Row className="px-3">
                    { stations.map( item => 
                        <Col key={item.id} xs="12" md="6" lg="4" xl="4">
                            <BusStationItem 
                                bus={bus} 
                                station={item} 
                                season={season} 
                                day={day} 
                                time={time}
                            />
                        </Col>
                    ) }
                </Row>
            </Col>
        </Row>
    );
}

export default React.memo(Bus);

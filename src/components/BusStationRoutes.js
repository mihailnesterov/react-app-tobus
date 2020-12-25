import React, { useState, useMemo } from 'react';
import {getRoutes} from '../api/RoutesAPI';
import { Card, CardDeck, CardTitle, CardText } from 'reactstrap';

function  BusStationRoutes(props) {

    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить маршруты...");

    const [routes, setRoutes] = useState([]);
    useMemo(() => {
        try {
            getRoutes(props.bus.id, props.station.id, props.season.id, props.day.id)
                .then(res => res.json())
                .then(res => setRoutes(res.rows)
                ).catch(err => setErrors(err));
        } catch (error) {
            console.log('useMemo fetch routes error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    },[props.bus.id, props.station.id, props.season.id, props.day.id, hasError,errorMsg]);

    const [hours, setHours] = useState([]);
    useMemo(() => {
        try {
            setHours([...new Set(routes.map( item => item.hours ))]);
        } catch (error) {
            console.log('useMemo set hours error',error);
        }
    },[routes]);

    const parseDateToInt = (hours,minutes) => {
        const now = new Date();
        return Date.parse(now.getDay() + '.' + now.getMonth() + '.' + now.getFullYear() + '.' + hours + ':' + minutes);
    }

    return (
        <CardDeck 
            className="d-flex align-items-start justify-content-around flex-wrap p-2" 
            style={{overflowY:"scroll",maxHeight: "350px"}}
        >
            { hours.map( hour =>
                <Card key={hour} body 
                    color="warning" 
                    className="text-center p-1 mx-1 mx-md-2 mb-1 mb-md-2"
                    style={{"minWidth":"60px"}}
                >
                    <CardTitle tag="h5" className="p-1 mb-1">
                        {hour}
                    </CardTitle>
                    <CardText className="d-block bg-white rounded shadow-sm p-2">
                        { routes
                            .filter(item => +item.hours === +hour )
                            .map( (item, index) => 
                                <span 
                                    key={item.id} 
                                    className={
                                        index > 0 ? 
                                        "border-top py-1 m-0 d-block" : 
                                        "py-1 m-0 d-block"
                                    }
                                    style={ 
                                        parseDateToInt(props.time.hours, props.time.minutes) > 
                                        parseDateToInt(item.hours, item.minutes) ?
                                        {color: 'red'} : {color: 'inherit'}
                                    }
                                >
                                    {item.minutes}
                                </span>
                            )
                        }
                    </CardText>
                </Card>
            ) }
        </CardDeck>
    );
}

export default React.memo(BusStationRoutes);

import React, { useState, useMemo } from 'react';
import {getRoutes} from '../api/RoutesAPI';
import { Button, Badge } from 'reactstrap';

function  StationClosestRoutes(props) {
    const [hasError, setErrors] = useState(false);
    const [errorMsg] = useState("Ошибка! Не удалось загрузить маршруты...");

    const [routes, setRoutes] = useState([]);
    useMemo(() => {
        try {
            getRoutes(props.bus_id, props.station_id, props.season_id, props.day_id)
                .then(res => res.json())
                .then(res => setRoutes(res.rows.filter( 
                        item => (+item.hours > +props.time.hours || 
                            (+item.hours === +props.time.hours && +item.minutes > +props.time.minutes)) 
                        ).slice(0, 3)
                    )
                ).catch(err => setErrors(err));
        } catch (error) {
            console.log('useEffect fetch routes error',error);
            if(hasError) {
                console.log(errorMsg);
            }
        }
    },[props,hasError,errorMsg]);

    return (
        <div className="d-flex justify-content-around align-items-center flex-wrap px-1">
            { routes.length === 0 ? 
                <Button 
                    color={"link"}
                    size="sm" 
                    className="p-0 m-0 text-muted text-underline mx-auto d-inline-block" 
                    title="Расписание на завтра"
                    id={"Popover-" + props.station_id}
                    >
                    завтра...
                </Button> : 
                routes.map( item => 
                    <Badge 
                        key={item.id} 
                        color="light" 
                        className={props.class}
                        style={{"fontSize":"12px"}}
                            >
                        {item.hours < 10 ? '0' + item.hours : item.hours}:{item.minutes < 10 ? '0' + item.minutes : item.minutes}
                    </Badge>
                )
            }
        </div>
    );
}

export default React.memo(StationClosestRoutes);

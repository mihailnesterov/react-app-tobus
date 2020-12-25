import React, { useState } from 'react';
import StationClosestRoutes from '../components/StationClosestRoutes';
import BusStationRoutes from '../components/BusStationRoutes';
import { Button, Badge, Toast, ToastBody, ToastHeader, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BusStationItem(props) {

    const {bus, station, day, time, season} = props;
    
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);
    
    return (
        <div className="mb-3 bg-docs-transparent-grid rounded text-center">
                                
            <Toast className="mx-auto">
                <ToastHeader 
                    icon={<Badge 
                            color="warning" 
                            style={{"fontSize":"14px"}}
                            >
                            {bus.num}
                        </Badge>
                        }
                    className="bg-light"
                    >
                    {station.name}
                </ToastHeader>
                <ToastBody className="d-flex justify-content-between align-items-center">
                    <div className="border p-1">
                        <p className="mb-0 text-muted small">Ближайшие рейсы:</p>
                        <StationClosestRoutes 
                            bus_id={bus.id} 
                            station_id={station.id} 
                            season_id={season.id} 
                            day_id={day.id} 
                            time={time}
                            class={"px-1 m-1 text-dark border"}
                        />
                    </div>
                    <Button 
                        color={"success"}
                        size="sm"
                        className={"px-2 py-1" }
                        title="Расписание"
                        id={"Popover-" + station.id}
                        type="button">
                        <FontAwesomeIcon icon={faClock} size="lg" /> <small>Расписание</small>
                    </Button>
                    
                    <Popover 
                        isOpen={popoverOpen}
                        placement="left-end" 
                        target={"Popover-" + station.id}
                        toggle={togglePopover}
                        >
                        <PopoverHeader>
                            <Badge color="warning" className="p-1 mr-2" style={{"fontSize":"14px"}}>
                                {bus.num}
                            </Badge>
                            {station.name}
                            <Button onClick={togglePopover} close className="pl-2" />
                        </PopoverHeader>
                        <PopoverBody>
                            <div className="pb-2 border-bottom d-flex align-items-center justify-content-between" style={{"fontSize":"12px"}} >
                                <span>
                                    <FontAwesomeIcon icon={faClock} size="sm" className="text-success mr-2"/>
                                    {+time.hours < 10 ? "0" + time.hours : time.hours}:{+time.minutes < 10 ? "0" + time.minutes : time.minutes}
                                </span>
                                <span className="ml-2">{day.name} / {season.name}</span>
                            </div>
                            <BusStationRoutes 
                                bus={bus} 
                                station={station}
                                season={season} 
                                day={day}
                                time={time}
                            />
                        </PopoverBody>
                    </Popover>
                </ToastBody>
            </Toast>
        </div>
    );
}

export default React.memo(BusStationItem);

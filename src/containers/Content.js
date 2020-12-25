
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Buses from '../routes/Buses';
import Bus from '../routes/Bus';
import Stations from '../routes/Stations';
import Station from '../routes/Station';
import Taxi from '../routes/Taxi';

function Content() {
    return (
        <div className="my-3 pb-2 shadow-sm text-center bg-white">
            <Switch>
                <Route path="/" exact render={
                    (props) => (<Buses {...props} 
                        pageTitle={'Маршруты'}
                    />)
                }/>
                <Route path="/stations" exact render={
                    (props) => (<Stations {...props} 
                        pageTitle={'Остановки'}
                    />)
                }/>
                <Route path="/taxi" exact render={
                    (props) => (<Taxi {...props} 
                        pageTitle={'Такси'}
                    />)
                }/>
                <Route path="/buses/:id" render={
                    (props) => (<Bus {...props}
                        pageTitle={'Маршрут № '}
                    />)
                }/>
                <Route path="/stations/:id" render={
                    (props) => (<Station {...props}
                        pageTitle={'Остановка '}
                    />)
                }/>
            </Switch>
        </div>
    );
}

export default Content;

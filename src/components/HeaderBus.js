import React from 'react';

function HeaderBus(props) {
    /**
     * не доделан!
     * в пропсы нужно передать bus и какой-то массив объектов {...непонятно чего для days и stations}
     */
    return (
        <header className="bg-gray shadow-sm p-1 mt-0 mb-3 d-flex align-items-center justify-content-between">
            <h2 className="m-2">{ props.bus.num ? <span className="d-block bg-warning py-1 px-2 text-white shadow-sm">{ props.bus.num }</span> : false }</h2>
            { props.bus.owner ? <p className="small m-0 p-2 text-dark text-center">{ props.bus.owner }</p> : false }
            {/* bus.comment ? <p className="border small text-secondary py-2 px-3 my-2">{ bus.comment }</p> : false */}
            <div className="m-0 days">
                { days.map( item =>
                    <Button 
                        key={item.id}
                        onClick={ () => setDay({ id:item.id, name:item.name })}
                        color={"link"}
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
                        color={"link"}
                        size="sm" 
                        active={+season.id === +item.id}
                        className={ +season.id === +item.id ? "text-dark shadow-sm py-1 px-2" : "text-light py-1 px-2" }
                        >
                        {item.name}
                    </Button>
                )}
            </div>
        </header>
    );
}

export default HeaderBus;

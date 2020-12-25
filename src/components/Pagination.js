import React, {useState, useMemo} from 'react';
import { Button, ButtonGroup, Input } from 'reactstrap';

function Pagination(props) {

    const [pagination, setPaginations] = useState([]);
    useMemo( () => {
        const pages = [];
        const count = props.limit > 0 ? Math.ceil(props.busesCount/props.limit) : 1;
        for (let i = 0; i < count; i++) {
            pages.push({
                index: i,
                num: (i+1),
                active: props.pageSelected,
                first: i === 0 ? true : false,
                last: count === (i+1) ? true : false
            });
        }
        setPaginations(pages);
    }, [props.busesCount, props.pageSelected, props.limit])
    
    return(
        <>
        { props.limit > 0 && pagination.length > 1 ?  
            <div className="mb-2 d-flex align-items-center justify-content-between justify-content-md-center flex-wrap">
                <ButtonGroup className="mx-3">
                    { pagination.map( item => 
                        <Button 
                            key={item.index} 
                            size="sm" 
                            color={props.pageSelected === item.index ? "secondary" : "light" }
                            onClick={() => props.setPageSelected(item.index)} 
                            active={props.pageSelected === item.index}
                            className="shadow-none border-0"
                            style={{width:"35px",height:"30px"}}
                        >
                            {item.num}
                        </Button>
                    ) }
                </ButtonGroup>
                <Input type="select" 
                    name="selectOnPageCount" 
                    id="selectOnPageCount" 
                    style={{width:"55px",height:"32px"}}
                    className="px-3 mx-3 text-dark"
                    onChange={e => { 
                        props.setLimit(e.currentTarget.value);
                        props.setPageSelected(0);
                    }}
                    defaultValue={props.defaultValue}
                >
                    { props.options.map( item => <option key={item} value={item}>{item}</option>) }
                </Input>
            </div> : 
            null
        }
        </>
    )
}

export default React.memo(Pagination);

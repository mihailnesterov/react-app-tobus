import React from 'react';
import { Spinner } from 'reactstrap';

function Loader(props) {
    const loaderStyle = {
        position: "absolute",
        left:0,
        top:0,
        bottom:0,
        right:0,
        zIndex:10,
        backgroundColor: "rgba(0,0,0,0.15)",
        display:  (props.isOpen ? "block" : "none" )
    }
    const spinnerStyle = {
        position: "absolute",
        left:"47%",
        top:"45%",
        bottom:0,
        right:0,
        zIndex:11
    }
    return(
        <div style={loaderStyle}>
            <Spinner color="light" style={spinnerStyle} />
        </div>
    )
}

export default Loader;

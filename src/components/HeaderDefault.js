import React from 'react';

function HeaderDefault(props) {
    return (
        <header className="bg-gray-light d-flex p-3 mb-3 align-items-start justify-content-center">
            <h3>{props.pageTitle}</h3>
        </header>
    );
}

export default HeaderDefault;

import React from 'react';
import MainMenu from '../components/MainMenu';
// https://www.digitalocean.com/community/tutorials/how-to-use-font-awesome-5-with-react-ru

function Header() {
    return (
        <header className="p-2 bg-secondary shadow-sm text-white text-center">
            <MainMenu />
        </header>
    );
}

export default Header;

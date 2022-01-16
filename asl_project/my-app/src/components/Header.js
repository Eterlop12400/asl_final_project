import React from 'react';

// Import components.
import Navigation from "./Navigation";

// Import vault.png
import icon from '../images/vault.png';

function Header(props) {
    return (
        <header style={styles.container}>
            <div style={styles.logo}>
                <img style={styles.img} src={icon} alt='vector image of a vault'/>
                <h1 style={styles.header}>{props.header}</h1>
            </div>
            <Navigation isLoggedIn={props.loggedIn} />
        </header>
    );
}

export default Header;

// CSS Modules
const styles = {
    container: {
        fontFamily: 'casablanca-urw, sans-serif',
    },
    header: {
        fontWeight: '700',
        fontSize: '42px',
    },
    img: {
        height: '80px',
        marginRight: '15px',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '150px',
        backgroundColor: '#001D3D',
        color: '#FFC300',
        width: '100%'
    }
}
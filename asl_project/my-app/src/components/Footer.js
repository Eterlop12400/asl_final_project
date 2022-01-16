import React from 'react';

function Footer(props) {
    return (
        <footer>
            <p style={styles.footer}>{props.footer}</p>
        </footer>
    );
}

export default Footer;

// CSS Modules
const styles = {
    footer: {
        backgroundColor: 'black',
        color: 'white',
        height: '116px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
        fontWeight: '300',
        fontSize: '23px',
        fontFamily: 'casablanca-urw, sans-serif',
    }
}
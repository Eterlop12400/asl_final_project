import React from 'react';

// Importing Component
import Footer from "../components/Footer";

// Importing vault.png
import icon from "../images/vault.png";


function Login() {
    return (
        <main>
            <header style={styles.container}>
                <div style={styles.logo}>
                    <img style={styles.img} src={icon} alt='vector image of a vault'/>
                    <h1 style={styles.header}>Quiz Vault</h1>
                </div>
            </header>
            <div className='login--main-container'>
                <div style={styles.loginWrapper}>
                    <div style={styles.loginContainer}>
                        <h1 style={styles.loginHeader}>Sign In</h1>
                        <h3>To login with GitHub please click on the link below</h3>
                        <a href="https://github.com/login/oauth/authorize?client_id=67d8675b6e1cfc39a6b0">Login With Github</a>
                    </div>
                </div>
            </div>
            <Footer footer='©Copyright 2022. All rights reserved.' />
        </main>
    )
}

const styles = {
    loginWrapper: {
        textAlign: 'center',
        marginTop: '0',
        paddingTop: '200px',
    },
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
    },
    loginContainer: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '60px 15px',
        borderRadius: '3px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        backgroundColor: '#BFC7C0',
    },
    loginHeader: {
        paddingTop: '0',
    },
}

export default Login
import React, {useEffect} from 'react';

function Logout() {

    useEffect(() => {
        // Deleting our token in our local storage, making the user log in again with oAuth.
        localStorage.removeItem('token');

        // Hiding view all quizzes link since the user is being logged out on this page.
        document.querySelector('.link-decoration-home').style.visibility = 'hidden';

        // Setting a timer for 1.5 sec then reloading the page which will take them bacj to <Login />.
        setInterval(() => {
            window.location.reload();
        }, 1500);

})

    return (
        <main className='logout--main-container'>
            <div className='logout--wrapper'>
                <div style={styles.logoutContainer}>
                    <h1 style={styles.logoutHeader}>Logging Out</h1>
                    <h3>Please wait, you are being redirected...</h3>
                    <p>Thank You, Come Back Soon!!</p>
                </div>
            </div>
        </main>
    )
}

// CSS Modules
const styles = {
    logoutContainer: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '60px 15px',
        borderRadius: '3px',
        boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
        backgroundColor: '#BFC7C0',
    },
    logoutHeader: {
        paddingTop: '0',
    },
}

export default Logout
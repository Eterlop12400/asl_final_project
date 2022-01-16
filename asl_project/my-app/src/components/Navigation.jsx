import React from 'react'
import  { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <nav style={styles.nav}>
                    <Link to="/" className='link-decoration-home'>View Quizzes</Link>
                    {this.props.isLoggedIn && <Link to="/logout" className='link-decoration-logout'>Logout</Link>}
                </nav>
            </div>
        );
    }
}

// CSS Modules
const styles = {
    container: {
        backgroundColor: '#001D3D',
        display: 'flex',
        justifyContent: 'center',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        paddingBottom: '50px',
    },
}

export default Navigation;
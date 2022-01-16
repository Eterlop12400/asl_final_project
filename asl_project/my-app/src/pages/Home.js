import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Importing Component
import Quiz from '../components/Quiz';

// Importing styles.css
import '../CSS/styles.css'


const Home = () => {
    const [quizzes, setQuizzes] = useState([])

    /*
     This function will make a call to the quizzes route on using out token as a header to access the API data on all the
     quizzes using out setter to set the state for quizzes based on our response data.
     */
    useEffect(() => {
        async function fetchQuizes() {
            const response = await axios('http://localhost:3000/quizzes', {
                headers: {
                    token: localStorage.token
                }
            })
            setQuizzes(response.data)
        }
        fetchQuizes()
    }, []);
    return (
        <main className='home--main-container'>
            <div style={styles.wrapper}>
                <h1 style={styles.header}>Take a Quiz!</h1>
                <p style={styles.subHeader}>Click <strong>'Take Quiz!'</strong> on any quiz listed below to take one.</p>
                <section style={styles.contentContainer}>
                    {/* This will loop through each quiz */}
                    {quizzes.map(quiz => (
                        <div key={quiz.id}>
                            <Quiz title={quiz.name + ' Quiz'} nav={'/quizzes/' + quiz.id} weight={'Quiz Weight: ' + quiz.weight + '%'} />
                        </div>
                    ))}
                </section>
            </div>
        </main>
    )
}

// CSS Modules
const styles = {
    wrapper: {
        lineHeight: '2',
        fontWeight: '300',
        fontSize: '18px',
        color: '#4E574F',
        align: 'center',
    },
    header: {
       marginTop: '0',
    },
    subHeader: {
        fontWeight: '500',
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        maxWidth: '1260px',
    },
}

export default Home
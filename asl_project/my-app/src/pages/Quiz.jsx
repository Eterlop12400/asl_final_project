import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios';

const Quiz = () => {
    const [quiz, setQuiz] = useState({Questions: []})
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        /*
         Calling our quizzes/:id route in our API with axios using our localStorage to set our token in the header to get quiz data and setting
         the response data to our quizData variable.
         */
        async function fetchQuiz() {
            const quizData = await axios(`http://localhost:3000/quizzes/${params.id}`, {
                headers: {
                    token: localStorage.token
                }
            })
            setQuiz(quizData.data)
        }
        fetchQuiz()
    }, []);

    return (
        <main className='quiz-page--main-container'>
            <form id="quiz">
                <header style={styles.quizTitle}>
                    <h1>{quiz.name} Quiz</h1>
                    <p><strong>Weight: {quiz.weight}%</strong></p>
                </header>
                <ul style={styles.ul}>
                    {/* This will loop over each of our questions in the quiz */}
                    {quiz.Questions.map(question => (
                        <div style={styles.questionContainer} key={question.id}>
                            <li>
                                <h3>{question.question}</h3>
                                <ul style={styles.ul}>
                                    <li>
                                        {/* This will loop over each of our choices in each question */}
                                        {question.Choices.map(choice => (
                                            <div className='choice-container' key={choice.id} onClick={selectOption}>
                                                <input type="radio" name={'question_' + question.id} required />
                                                <label style={styles.label} onClick={selectOption}>{choice.label}</label>
                                            </div>
                                        ))}
                                    </li>
                                </ul>
                            </li>
                        </div>
                    ))}
                </ul>
                <button className='button-quiz' type="submit" onClick={formAction}>Submit Quiz</button>
            </form>
        </main>
    )

    /*
    This function will run and prevent the form from being submitted. It will then check to make sure the form is valid.
    If the form is valid it will navigate back to the home page, otherwise it will display errors to the user.
     */
    function formAction(e) {
        const form = document.querySelector('#quiz');

        // Prevent the form from being submitted.
        e.preventDefault();

        if(form.checkValidity() === true) { // If the form comes back as true it is valid.
            navigate('/');
        } else { // If the form comes back false we want to show the user the error.
            form.reportValidity();
        }
    }

    // This function will allow user's to click on the container to select an option rather than having to select the radio button directly.
    function selectOption(e) {
        if (e.target.className === "choice-container") {
            e.target.children[0].checked = true;
        } else {
            e.target.closest('.choice-container').children[0].checked = true;
        }
    }
}

// CSS Modules
const styles = {
    quizTitle: {
        backgroundColor: 'rgb(0, 29, 61)',
        color: 'rgb(255, 195, 0)',
        padding: '15px 0',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
    },
    questionContainer: {
        textAlign: 'left',
        width: '75%',
        paddingLeft: '75px',
        marginBottom: '50px',
        marginTop: '50px',
    },
    ul: {
        paddingLeft: '0',
    },
    label: {
        paddingLeft: '10px',
    }
}


export default Quiz
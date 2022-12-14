import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"
import Answers from "./Answers";
import * as ReactBootStrap from "react-bootstrap"
import getQuestions from "../data/data";
import { FaArrowLeft } from "react-icons/fa"

export default function Quiz(props) {
    const [trivia, setTrivia] = useState([])
    const [score, setScore] = useState(0)
    const [over, setOver] = useState(false)


    useEffect(() => {
        console.log("trivia changed");
        getQuestions(props.options).then(questions => {
            return setTrivia(prevState => questions.map((value) => {
                let arr = value.incorrect_answers
                arr.splice(randomInt(0, 4), 0, value.correct_answer)
                return {
                    id: nanoid(),
                    question: value.question,
                    answers: arr,
                    correctAnswer: value.correct_answer,
                    isSelected: ""
                }
            }))
        })
        // }
        // getTrivia()
    }, [])
    // console.log(trivia);

    useEffect(() => {
        let correct = 0
        trivia.forEach(question => {
            if (question.correctAnswer === question.isSelected)
                correct++
        })
        setScore(correct)
    }, [trivia])

    // console.log(score);


    function handleAnswer(event, id, rec) {
        setTrivia(prevState => prevState.map((value) =>
        // console.log(value);
        (
            value.id === id ? { ...value, isSelected: rec } : value
        )
        ))
    }

    function scoring() {
        setOver(prevState => !prevState)
    }

    return (
        <>
            <div className="title--wrapper">
                <FaArrowLeft className="back" onClick={() => props.onClick()} />
                <h1 className="title">Quick Quiz</h1>
                <a href="https://www.facebook.com/Kritar.00/" rel="noreferrer" target="_blank" className="my-info">My Info</a>
            </div>
            <div className='quiz--container'> {
                trivia !== [] ?
                    (trivia.map((value, index) => {
                        return (
                            <Answers over={over} key={value.id} question={value.question} id={value.id} answers={value.answers} correctAnswer={value.correctAnswer} isSelected={value.isSelected} handleAnswer={handleAnswer} />
                        )
                    })) :
                    (<ReactBootStrap.Spinner animation="border" variant="dark" />)
            }
                <hr />
            </div>
            {over ? <div className="ended">
                <h1>You scored {score}/10 answers</h1>
                <button className="restart" onClick={() => props.onClick()}>Restart Game</button>
            </div> :
                <button className="checkAnswer" onClick={scoring}>Check Answers</button>}
        </>
    )
}
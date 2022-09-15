import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"
import Answers from "./Answers";

export default function Quiz(props) {
    const [trivia, setTrivia] = useState([])
    const [answer, setAnswer] = useState([])
    const [score, setScore] = useState(0)
    const [over, setOver] = useState(false)


    useEffect(() => {
        console.log("trivia changed");
        async function getTrivia() {
            const res = await fetch(`https://the-trivia-api.com/api/questions`)
            const data = await res.json()
            // setTrivia(prevState => data)
            setTrivia(prevState => data.map((value) => {
                // let arr = value.incorrectAnswers
                // arr.splice(randomInt(0, 4), 0, value.correctAnswer)
                return {
                    id: value.id,
                    question: value.question,
                    incorrectAnswers: value.incorrectAnswers,
                    correctAnswer: value.correctAnswer,
                    isSelected: ""
                }
            }))

        }

        getTrivia()

    }, [])
    console.log(trivia);

    useEffect(() => {
        let correct = 0
        trivia.forEach(question => {
            if (question.correctAnswer === question.isSelected)
                correct++
        })
        setScore(correct)
    }, [trivia])

    console.log(score);


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
            <div className='quiz--container'> {
                trivia.map((value, index) => {
                    return (
                        <Answers over={over} key={value.id} question={value.question} id={value.id} incorrectAnswers={value.incorrectAnswers} correctAnswer={value.correctAnswer} isSelected={value.isSelected} handleAnswer={handleAnswer} />
                    )
                })}
            </div>
            {over ? <div className="ended">
                <h1>You have score: {score}/10</h1>
                <button className="restart" onClick={() => props.onClick()}>Restart Game</button>
            </div> :
                <button className="checkAnswer" onClick={scoring}>Check Answers</button>}
        </>
    )
}
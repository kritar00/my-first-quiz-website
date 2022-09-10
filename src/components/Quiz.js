import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"
import Answers from "./Answers";

export default function Quiz(props) {
    const [trivia, setTrivia] = useState([])
    const [answer, setAnswer] = useState([])
    const [won, setWon] = useState(false)


    useEffect(() => {
        console.log("trivia changed");
        async function getTrivia() {
            const res = await fetch(`https://the-trivia-api.com/api/questions`)
            const data = await res.json()
            setTrivia(prevState => data)
        }
        getTrivia()
        function allAnswers() {
            setAnswer(prevState => trivia.map((value) => {
                return {
                    isSelected: false,
                    value: value.correctAnswer
                }
            }))
        }
        allAnswers()
    }, [])

    function handleAnswer(event, value) {
        event.stopPropagation();
        setAnswer(prevState => prevState.map((answer) => {
            if (answer.value === value) {
                return {
                    ...answer, isSelected: !answer.isSelected
                }
            }
            return answer
        }))
    }
    console.log(answer);


    return (
        trivia.map((value, index) => {
            let ansArray = value.incorrectAnswers
            ansArray.splice(randomInt(0, 4), 0, value.correctAnswer)

            return (<div key={value.id}>
                <h2>{value.question}</h2>
                <div className="button--container">{
                    ansArray.map((value, index) => {
                        return (
                            <Answers value={value} handleAnswer={handleAnswer} id={index} key={nanoid()} />
                        )
                    })
                }
                </div>
            </div>)
        })
    )
}
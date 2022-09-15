import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"

export default function Answers(props) {
    // const [options, setOptions] = useState([])

    const incorrectElements = props.incorrectAnswers.map(option => {
        return (
            <button className={props.isSelected === option ? "selected--button" : "just--button"}
                key={nanoid()} onClick={(event) => props.handleAnswer(event, props.id, option)}
            >
                {option}
            </button>
        )
    })

    const correctElement =
        <button key={nanoid()}
            className={props.isSelected === props.correctAnswer ? "selected--button" : "just--button"}
            onClick={(event) => props.handleAnswer(event, props.id, props.correctAnswer)}
        >
            {props.correctAnswer}
        </button>

    incorrectElements.push(correctElement)
    // console.log(incorrectElements);
    const options = incorrectElements.sort((a, b) => (
        a.props.children.localeCompare(b.props.children))
    )
    // console.log(options);

    // useEffect(() => {
    //     function shuffle(array) {
    //         let currentIndex = array.length, randomIndex;

    //         // While there remain elements to shuffle.
    //         while (currentIndex !== 0) {

    //             // Pick a remaining element.
    //             randomIndex = Math.floor(Math.random() * currentIndex);
    //             currentIndex--;

    //             // And swap it with the current element.
    //             [array[currentIndex], array[randomIndex]] = [
    //                 array[randomIndex], array[currentIndex]];
    //         }

    //         return array;
    //     }
    //     setOptions(shuffle(incorrectElements))
    // }, [])


    return (
        <div className="question--container">
            <h3>{props.question}</h3>
            <div className="answers--container">
                {options}
            </div>
        </div>
    )
}
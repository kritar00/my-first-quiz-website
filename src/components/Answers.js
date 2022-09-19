import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"

export default function Answers(props) {
    // const [options, setOptions] = useState([])

    const answers = props.answers.map(option => {
        const answerClassName = `${props.isSelected === option ? "selected--button" : "just--button"}`
        return (
            <button className={answerClassName} style={{ backgroundColor: props.over && (props.correctAnswer === option ? "#94D7A2" : "rgba(214, 63, 63, 0.842)") }}
                key={nanoid()} onClick={(event) => props.handleAnswer(event, props.id, option)}
            >
                {option}
            </button>
        )
    })

    console.log(answers);

    // const correctClassName = `${props.isSelected === props.correctAnswer ? "selected--button" : "just--button"}\
    //                             ${props.over && "correct"}`
    // const correctElement =
    //     <button key={nanoid()}
    //         className={correctClassName}
    //         onClick={(event) => props.handleAnswer(event, props.id, props.correctAnswer)}
    //     >
    //         {props.correctAnswer}
    //     </button>

    // incorrectElements.push(correctElement)
    // console.log(incorrectElements);
    // const options = incorrectElements.sort((a, b) => (
    //     a.props.children.localeCompare(b.props.children))
    // )
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
            <span>
                <h3>{props.question}</h3>
                {props.over && (props.correctAnswer === props.isSelected ? <img className="check--image" alt="correct" src={require("../assets/images/correct.png")} /> : <img className="check--image" alt="incorrect" src={require("../assets/images/incorrect.png")} />)}
            </span>
            <div className="answers--container">
                {answers}
            </div>
        </div>
    )
}
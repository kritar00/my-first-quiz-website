import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"

export default function Answers(props) {

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

    const options = incorrectElements.sort((a, b) => (
        a.props.children.localeCompare(b.props.children))
    )
    // useEffect(() => {
    //     setOptions(prevState => prevState.map((value) => (
    //         if (props.isSelected === value)
    //     )))
    // }, [props.isSelected])


    return (
        <div className="question--container">
            <h3>{props.question}</h3>
            {options}
        </div>
    )
}
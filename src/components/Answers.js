import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"
import { decode } from "html-entities"
import { FaCheck, FaTimes } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

export default function Answers(props) {
    // const [options, setOptions] = useState([])
    const correct = {
        backgroundColor: "#94D7A2"
    }
    const incorrect = {
        backgroundColor: "rgba(214, 63, 63, 0.8)",
        opacity: "0.5"
    }
    const answers = props.answers.map(option => {
        const answerClassName = `${props.isSelected === option ? "selected--button" : "just--button"}`
        return (
            <button className={answerClassName} style={props.over ? (props.correctAnswer === option ? correct : incorrect) : {}}
                key={nanoid()} onClick={(event) => props.handleAnswer(event, props.id, option)}
            >
                {decode(option)}
            </button>
        )
    })


    return (
        <div className="question--container">
            <span>
                <h3>{decode(props.question)}</h3>
                {props.over && (props.correctAnswer === props.isSelected ? <FaCheck className="correct" /> : <FaTimes className="incorrect" />)}
            </span>
            <div className="answers--container">
                {answers}
            </div>
        </div>
    )
}
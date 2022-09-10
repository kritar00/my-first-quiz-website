import React, { useEffect, useState } from "react";
import randomInt from "./Helpers"
import { nanoid } from "nanoid"

export default function Answers(props) {
    const { value, handleAnswer, id } = props
    // console.log(value);
    return (
        <button className="button"
            key={id} onClick={(event) => handleAnswer(event, value)} >{value}</button>
    )
}
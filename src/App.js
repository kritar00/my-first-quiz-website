import React, { useEffect, useState } from 'react'
import Quiz from './components/Quiz'
import "./SCSS/App.scss"
export default function App() {
    const [started, setStarted] = useState(false)
    const startGame = () => setStarted(!started)
    return (
        <main>
            {started ?
                <Quiz onClick={startGame} />
                : <div className='start--page'>
                    <h1>Quizzical</h1>
                    <h4>Some description</h4>
                    <button onClick={startGame}>Start quiz</button>
                </div>
            }
        </main>
    )
}

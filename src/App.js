import React, { useEffect, useState } from 'react'
import Quiz from './components/Quiz'

export default function App() {
    const [started, setStarted] = useState(false)

    return (
        <main>
            {started ?
                <Quiz />
                : <div>
                    <h1>Quizzical</h1>
                    <h4>Some description</h4>
                    <button onClick={() => setStarted(!started)}>Start quiz</button>
                </div>
            }
        </main>
    )
}

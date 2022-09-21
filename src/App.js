import React, { useEffect, useState } from 'react'
import Quiz from './components/Quiz'
import "./SCSS/App.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    const [started, setStarted] = useState(false)
    const [options, setOptions] = useState({
        category: "",
        difficulty: ""
    })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        console.log("Effect ran");
        async function getCategories() {
            const res = await fetch(`https://opentdb.com/api_category.php`)
            const data = await res.json()
            // console.log(data.trivia_categories);
            setCategories(data.trivia_categories)
        }
        getCategories()

    }, [])
    const handleChange = (event) => {
        const { name, value } = event.target
        setOptions(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const startGame = () => setStarted(!started)
    return (
        <main>
            <img id='topImg' src={require("./assets/images/topright.png")} alt="top"></img>
            <img id='botImg' src={require("./assets/images/bottomleft.png")} alt="bottom"></img>
            {started ?
                <Quiz options={options} onClick={startGame} />
                : <div className='start--page'>
                    <h1>Quizzical</h1>
                    <h4>How hard can it be?</h4>
                    <div className='options--container'>
                        <div className='select'>
                            <label htmlFor='category'>Category:</label>
                            <select name='category'
                                id='category'
                                className='selection'
                                value={options.category}
                                onChange={handleChange}>
                                <option value="">Any category</option>
                                {categories.map((value, index) => {
                                    return (
                                        <option key={index} value={value.id}>{value.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='select'>
                            <label htmlFor='difficulty'>Difficulty:</label>
                            <select name='difficulty'
                                id='difficulty'
                                className='selection'
                                value={options.difficulty}
                                onChange={handleChange}
                            >
                                <option value="">Any Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={startGame}>Start quiz</button>
                </div>
            }
        </main>
    )
}

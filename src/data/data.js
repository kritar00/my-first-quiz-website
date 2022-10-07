export default function getQuestions(options) {
    const { category, difficulty } = options

    let categoryQueryParam = ""
    let difficultyQueryParam = ""
    if (category !== "") {
        categoryQueryParam = `&category=${category}`
    }
    if (difficulty !== "") {
        difficultyQueryParam = `&difficulty=${difficulty}`
    }

    let URL = `https://opentdb.com/api.php?amount=10${categoryQueryParam}${difficultyQueryParam}&type=multiple`

    return fetch(URL)
        .then(res => res.json())
        .then(data => data.results)
}
import {useState} from "react";

export const QuizComponent = () => {
    const [currentQuiz, setCurrentQuiz] = useState<string>();
    const [quizzes, setQuizzes] = useState<string[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<{ question: string, answer: string }>();
    const [answer, setAnswer] = useState<string>()
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState()
    const [questions, setQuestions] = useState<{ question: string, answer: string }[]>([{question: "q1", answer: "a1"}])

    const resetQuiz = () => {
        setShowResult(false);
        setCurrentQuiz(undefined)
        setCurrentQuestion(undefined)
    };



    return (
        <div className={"content"}
             style={{padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif"}}>
            <h1>Simple Online Quiz</h1>
            <div className="field">
                <label className="label">Quiz</label>
                <div className="control">
                    <select
                        className="select"
                        value={currentQuiz}
                        onChange={(e) => setCurrentQuiz(e.target.value)}
                    >
                        {quizzes?.map((it, idx) => {
                            return <option key={idx} value={it}>{it}</option>
                        })}
                    </select>
                </div>
            </div>
            {showResult ? (
                <div>
                    <h2>Your Score: {score}/{questions.length}</h2>
                    <button onClick={resetQuiz} style={buttonStyle}>
                        Try Again
                    </button>
                </div>
            ) : (

                currentQuiz ? <div>
                    <h2>Question {questions?.findIndex(it => it.question == currentQuestion?.question) + 1}/{questions.length}</h2>
                    <p>Question: {currentQuestion?.question}</p>
                    <div className="field">
                        <label className="label">Answer</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your question"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                </div> : <span/>
            )}
        </div>
    );

}
const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};
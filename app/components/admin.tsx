import {useEffect, useState} from 'react';
import {v4} from "uuid";
import {QuizApi} from "@/app/api/QuizApi";
import {findEventStore, registerEventListener} from "@/infrastructure/inmemoryEventstore";
import {Event} from "@event-driven-io/emmett";

export function AdminQuizConfig() {
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [quizzes, setQuizzes] = useState<(string)[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<string>()
    const [newQuiz, setNewQuiz] = useState<string>()

    const handleAddQuestion = () => {

        const newQuestion = {
            question: currentQuestion,
            answer: currentAnswer,
        };

        setQuestions([...questions, newQuestion]);
        // Reset fields
        setCurrentQuestion('');
        setCurrentAnswer('')
    };

    useEffect(() => {
        registerEventListener({
            on(streamName: string, events: Event[]) {
                findEventStore().readStream(streamName).then(event => {
                    event?.events.forEach((event) => {
                        switch (event.type) {
                            // build projection
                        }
                    })
                })
            }
        })
    })


    return (
        <div className="container mt-5">
            <h1 className="title">Admin: Configure Quiz</h1>

            <div className={"box"}>
                <div className="field">
                    <label className="label">Quiz</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Quiz name"
                            value={newQuiz}
                            onChange={(e) => setNewQuiz(e.target.value)}
                        />
                    </div>
                    <label className="label"></label>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={() => {
                                // send command
                                //QuizApi.handle(createQuizCommand)
                            }}>
                                Create Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box">
                <h2 className="subtitle">Configured Quizzes</h2>
                {quizzes.length === 0 ? (
                    <p>No questions added yet.</p>
                ) : (
                    <select onChange={(evt) => setSelectedQuiz(evt.target.value)} className={"select"}>
                        {quizzes.map((quiz, index) => (
                            <option value={quiz} key={index}>
                                <strong>Quiz:</strong> {quiz}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {selectedQuiz ?
                <div className="box">
                    <h2 className="subtitle">Add a New Question</h2>

                    <div className="field">
                        <label className="label">Question</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your question"
                                value={currentQuestion}
                                onChange={(e) => setCurrentQuestion(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Answer</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter your question"
                                value={currentQuestion}
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                            />
                        </div>
                    </div>

                    <label className="label">Answers</label>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={handleAddQuestion}>
                                Add Question
                            </button>
                        </div>
                    </div>
                </div> : <span/>}


        </div>
    );
}

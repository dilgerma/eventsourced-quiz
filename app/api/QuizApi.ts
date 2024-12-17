import {Score} from "@/app/api/commands/Score";
import {AnswerQuestion} from "@/app/api/commands/AnswerQuestion";
import {JoinQuiz} from "@/app/api/commands/JoinQuiz";
import {StartQuiz} from "@/app/api/commands/StartQuiz";
import {AddQuestion} from "@/app/api/commands/AddQuestion";
import {CreateQuiz} from "@/app/api/commands/CreateQuiz";
import {QuizEvents} from "@/app/api/events/QuizEvents"


export const handleScore = (command: Score): QuizEvents[] => {
    return [{
        type: 'Scorecalculated',
        data: {
            name: command.name,
            score: command.score,
            quizId: command.quizId
        }
    }]
}

export const handleAnswerQuestion = (command: AnswerQuestion): QuizEvents[] => {
    return [{
        type: 'Questionanswered',
        data: {
            questionId: command.questionId,
            name: command.name,
            givenAnswer: command.givenAnswer,
            quizId: command.quizId
        }
    },
        {
            type: 'Quizended',
            data: {
                quizId: command.quizId
            }
        }]
}

export const handleJoinQuiz = (command: JoinQuiz): QuizEvents[] => {
    return [{
        type: 'Quizjoined',
        data: {
            aggregateId: command.aggregateId,
            participantName: command.participantName,
            quizId: command.quizId
        }
    }]
}

export const handleStartQuiz = (command: StartQuiz): QuizEvents[] => {
    return [{
        type: 'QuizStarted',
        data: {
            startTime: command.startTime,
            quizId: command.quizId
        }
    }]
}

export const handleAddQuestion = (command: AddQuestion): QuizEvents[] => {
    return [{
        type: 'QuestionAdded',
        data: {
            answer: command.answer,
            question: command.question,
            questionId: command.questionId,
            quizId: command.quizId
        }
    }]
}

export const handleCreateQuiz = (command: CreateQuiz): QuizEvents[] => {
    return [{
        type: 'QuizCreated',
        data: {
            quizTitle: command.data.quizTitle,
            quizId: command.data.quizId
        }
    }]
}

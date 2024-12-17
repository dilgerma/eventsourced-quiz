import {Command} from "@event-driven-io/emmett"

export type StartQuiz = Command<StartQuiz,{
    
	startTime:string,
	quizId:string    
    
}
import {Event} from "@event-driven-io/emmett"

export type QuizCreated = Event<"QuizCreated",{
    
	quizTitle:string,
	quizId:string    
    
}>
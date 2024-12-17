import {Event} from "@event-driven-io/emmett"

export type QuizStarted = Event<"QuizStarted",{
    
	startTime:string,
	quizId:string    
    
}>
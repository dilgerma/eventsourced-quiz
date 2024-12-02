import {Event} from "@event-driven-io/emmett"

export type QuestionAdded = {
    
	answer:string,
	question:string,
	questionId:string,
	quizId:string    
    
}
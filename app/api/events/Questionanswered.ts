import {Event} from "@event-driven-io/emmett"

export type Questionanswered = {
    
	questionId:string,
	name:string,
	givenAnswer:string,
	quizId:string    
    
}
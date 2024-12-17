import {Event} from "@event-driven-io/emmett"

export type Quizended = Event<"Quizended",{
    
	quizId:string    
    
}>